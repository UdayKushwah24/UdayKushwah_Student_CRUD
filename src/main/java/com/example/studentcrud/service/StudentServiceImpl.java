package com.example.studentcrud.service;

import com.example.studentcrud.model.Student;
import com.example.studentcrud.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> getStudentById(Integer id) {
        return studentRepository.findById(id);
    }

    @Override
    public Optional<Student> updateStudent(Integer id, Student student) {
        if (!studentRepository.existsById(id)) {
            return Optional.empty();
        }

        student.setId(id);
        studentRepository.update(student);
        return Optional.of(student);
    }

    @Override
    public boolean deleteStudent(Integer id) {
        if (!studentRepository.existsById(id)) {
            return false;
        }
        return studentRepository.deleteById(id);
    }
}
