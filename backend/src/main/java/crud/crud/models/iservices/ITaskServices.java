package crud.crud.models.iservices;

import crud.crud.models.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITaskServices {

        public List<Task> findAll();

        public Page<Task> findAll(Pageable pageable);

        public Task finById(Long id);

        public Task save(Task task);

        public void delete (Long id);

}
