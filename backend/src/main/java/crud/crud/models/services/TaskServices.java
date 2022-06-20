package crud.crud.models.services;

import crud.crud.models.dao.ITaskDoa;
import crud.crud.models.entity.Task;
import crud.crud.models.iservices.ITaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskServices implements ITaskServices {

    @Autowired
    private ITaskDoa taskDao;

    @Override
    @Transactional
    public List<Task> findAll() { return (List<Task>) taskDao.findAll(); }

    @Override
    @Transactional(readOnly = true)
    public Page<Task> findAll(Pageable pageable) { return taskDao.findAll(pageable); }

    @Override
    @Transactional(readOnly = true)
    public Task finById(Long id) { return taskDao.findById(id).orElse(null);}

    @Override
    @Transactional
    public Task save(Task task) { return taskDao.save(task); }

    @Override
    public void delete(Long id) { taskDao.deleteById(id); }
}
