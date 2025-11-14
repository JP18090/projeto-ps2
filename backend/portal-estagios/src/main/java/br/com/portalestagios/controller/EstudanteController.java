package br.com.portalestagios.controller;

import br.com.portalestagios.entity.Estudante;
import br.com.portalestagios.service.EstudanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudante")
public class EstudanteController {

    @Autowired
    private EstudanteService estudanteService;

    @GetMapping
    public List<Estudante> getAllEstudantes() {
        return estudanteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudante> getEstudanteById(@PathVariable Long id) {
        return estudanteService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Estudante createEstudante(@RequestBody Estudante estudante) {
        return estudanteService.save(estudante);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudante> updateEstudante(@PathVariable Long id, @RequestBody Estudante estudante) {
        return estudanteService.update(id, estudante)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEstudante(@PathVariable Long id) {
        if (estudanteService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}