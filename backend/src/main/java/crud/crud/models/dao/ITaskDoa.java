package crud.crud.models.dao;

import crud.crud.models.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ITaskDoa extends JpaRepository <Task, Long> {

    @Query("from Task")
    public List<Task> findAllTask();

}
