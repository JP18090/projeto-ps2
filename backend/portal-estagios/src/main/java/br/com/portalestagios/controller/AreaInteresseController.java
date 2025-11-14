package br.com.portalestagios.controller;

import br.com.portalestagios.entity.AreaInteresse;
import br.com.portalestagios.service.AreaInteresseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/area-interesse", "/areas"})
public class AreaInteresseController {

    @Autowired
    private AreaInteresseService areaInteresseService;

    @GetMapping
    public List<AreaInteresse> getAllAreas() {
        return areaInteresseService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AreaInteresse> getAreaById(@PathVariable Long id) {
        return areaInteresseService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public AreaInteresse createArea(@RequestBody AreaInteresse areaInteresse) {
        return areaInteresseService.save(areaInteresse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AreaInteresse> updateArea(@PathVariable Long id, @RequestBody AreaInteresse areaInteresse) {
        return areaInteresseService.update(id, areaInteresse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArea(@PathVariable Long id) {
        if (areaInteresseService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}