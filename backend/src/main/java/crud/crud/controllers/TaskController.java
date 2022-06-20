package crud.crud.controllers;

import crud.crud.models.entity.Task;
import crud.crud.models.iservices.ITaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private ITaskServices taskServices;


    @GetMapping("/tasks")
    public List<Task> index( ) { return taskServices.findAll(); };

    @PostMapping("/task/{id}")
    public ResponseEntity<?> save(@RequestBody Task task){
        Map<String, Object> response = new HashMap<>();
        Task taskNew = null;

       try {
           SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
           Date date = new Date();

           task.setBeginningDate(date);
           taskNew = taskServices.save(task);
       }catch (DataAccessException e){
           response.put("message" , "Error al realizar la  consulta en la base de datos");
           response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
           return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
       }

        response.put("message", "Sea credo la tarea en la base de datos");
        response.put("task", taskNew);
        return new ResponseEntity<Map <String, Object> >(response, HttpStatus.CREATED);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<?> edit(@RequestBody Task task, @PathVariable Long id){
        Map<String, Object> response = new HashMap<>();
        Task taskExisting = taskServices.finById(id);


        if(taskExisting != null){
            response.put("mensaje", "Error: no pudo editar, el task : " .concat(id.toString().concat(" no existe en la base de datos")));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.NOT_FOUND);
        }

        Task taskUpdate = null;

        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            Date date = new Date();

            taskExisting.setTitle(task.getTitle());
            taskExisting.setDescription(task.getDescription());
            taskExisting.setEndDate(date);

            taskUpdate = taskServices.save(taskExisting);

        }catch (DataAccessException e){

            response.put("mensaje" , "Error al actualizar la base de datos");
            response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity <Map <String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "El task ha sido actualizado con exito");
        response.put("cliente", taskUpdate);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> edit( @PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Task task = taskServices.finById(id);
            taskServices.delete(id);
        }catch (DataAccessException e){
            response.put("mensaje" , "Error al eliminar en la base de datos ");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String , Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "se eliminado correctamente el cliente");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

}
