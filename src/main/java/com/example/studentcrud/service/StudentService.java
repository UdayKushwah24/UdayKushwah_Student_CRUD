package com.example.studentcrud.service;

import com.example.studentcrud.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    Student createStudent(Student student);

    List<Student> getAllStudents();

    Optional<Student> getStudentById(Integer id);

    Optional<Student> updateStudent(Integer id, Student student);

    boolean deleteStudent(Integer id);
}
