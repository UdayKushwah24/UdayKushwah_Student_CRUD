package com.example.studentcrud.repository;

import com.example.studentcrud.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class JdbcStudentRepository implements StudentRepository {

    private static final String INSERT_SQL = "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";
    private static final String SELECT_ALL_SQL = "SELECT id, name, email, course FROM students ORDER BY id";
    private static final String SELECT_BY_ID_SQL = "SELECT id, name, email, course FROM students WHERE id = ?";
    private static final String UPDATE_SQL = "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?";
    private static final String DELETE_SQL = "DELETE FROM students WHERE id = ?";
    private static final String EXISTS_SQL = "SELECT COUNT(*) FROM students WHERE id = ?";

    private static final RowMapper<Student> STUDENT_ROW_MAPPER = (resultSet, rowNum) -> {
        Student student = new Student();
        student.setId(resultSet.getInt("id"));
        student.setName(resultSet.getString("name"));
        student.setEmail(resultSet.getString("email"));
        student.setCourse(resultSet.getString("course"));
        return student;
    };

    private final JdbcTemplate jdbcTemplate;

    public JdbcStudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Student save(Student student) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement preparedStatement = connection.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getEmail());
            preparedStatement.setString(3, student.getCourse());
            return preparedStatement;
        }, keyHolder);

        Number generatedKey = keyHolder.getKey();
        if (generatedKey != null) {
            student.setId(generatedKey.intValue());
        }
        return student;
    }

    @Override
    public List<Student> findAll() {
        return jdbcTemplate.query(SELECT_ALL_SQL, STUDENT_ROW_MAPPER);
    }

    @Override
    public Optional<Student> findById(Integer id) {
        List<Student> students = jdbcTemplate.query(SELECT_BY_ID_SQL, STUDENT_ROW_MAPPER, id);
        return students.stream().findFirst();
    }

    @Override
    public boolean update(Student student) {
        int rowsUpdated = jdbcTemplate.update(
                UPDATE_SQL,
                student.getName(),
                student.getEmail(),
                student.getCourse(),
                student.getId()
        );
        return rowsUpdated > 0;
    }

    @Override
    public boolean deleteById(Integer id) {
        int rowsDeleted = jdbcTemplate.update(DELETE_SQL, id);
        return rowsDeleted > 0;
    }

    @Override
    public boolean existsById(Integer id) {
        Integer count = jdbcTemplate.queryForObject(EXISTS_SQL, Integer.class, id);
        return count != null && count > 0;
    }
}
