package br.com.portalestagios.controller;

import br.com.portalestagios.dto.InscricaoRequest;
import br.com.portalestagios.dto.InscricaoResponse;
import br.com.portalestagios.entity.Inscricao;
import br.com.portalestagios.service.InscricaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inscricao")
public class InscricaoController {

    @Autowired
    private InscricaoService inscricaoService;

    @GetMapping
    public List<Inscricao> getAllInscricoes() {
        return inscricaoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscricao> getInscricaoById(@PathVariable Long id) {
        return inscricaoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/estudante/{estudanteId}")
    public ResponseEntity<List<InscricaoResponse>> getInscricoesByEstudante(@PathVariable Long estudanteId) {
        List<InscricaoResponse> inscricoes = inscricaoService.findByEstudanteId(estudanteId);
        return ResponseEntity.ok(inscricoes);
    }
    
    @GetMapping("/vaga/{vagaId}")
    public ResponseEntity<List<InscricaoResponse>> getInscricoesByVaga(@PathVariable Long vagaId) {
        List<InscricaoResponse> inscricoes = inscricaoService.findByVagaId(vagaId);
        return ResponseEntity.ok(inscricoes);
    }
    
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkInscricaoExists(@RequestParam Long vagaId, @RequestParam Long estudanteId) {
        boolean exists = inscricaoService.existsByVagaAndEstudante(vagaId, estudanteId);
        return ResponseEntity.ok(exists);
    }

    @PostMapping
    public ResponseEntity<?> createInscricao(@RequestBody InscricaoRequest request) {
        try {
            InscricaoResponse response = inscricaoService.createInscricao(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inscricao> updateInscricao(@PathVariable Long id, @RequestBody Inscricao inscricao) {
        return inscricaoService.update(id, inscricao)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInscricao(@PathVariable Long id) {
        if (inscricaoService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}