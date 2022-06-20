package crud.crud.models.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String title;

    private String description;

    @Column(name = "beginning_date")
    private Date beginningDate;

    @Column(name = "start_date")
    private Date startDate;
}
