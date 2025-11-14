package br.com.portalestagios.controller;

import br.com.portalestagios.dto.RegisterEstudanteRequest;
import br.com.portalestagios.dto.RegisterEmpresaRequest;
import br.com.portalestagios.entity.Empresa;
import br.com.portalestagios.entity.Estudante;
import br.com.portalestagios.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping("/candidato")
    public ResponseEntity<?> registerEstudante(@RequestBody RegisterEstudanteRequest request) {
        try {
            Estudante estudante = registerService.registerEstudante(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(estudante);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/empresa")
    public ResponseEntity<?> registerEmpresa(@RequestBody RegisterEmpresaRequest request) {
        try {
            Empresa empresa = registerService.registerEmpresa(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(empresa);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
