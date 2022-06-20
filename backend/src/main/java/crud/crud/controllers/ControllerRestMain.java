package crud.crud.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ControllerRestMain {


    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo){
        Map<String, Object> response = new HashMap<>();

        if(!archivo.isEmpty()){

            String nombreArchivo = archivo.getOriginalFilename();

            response.put("cliente", nombreArchivo);
            response.put("mensaje" , "Has subido correctamente la imagen" + nombreArchivo);
        }

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }
}
