package br.com.portalestagios.controller;

import br.com.portalestagios.entity.Empresa;
import br.com.portalestagios.service.EmpresaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {
    private final EmpresaService service;

    public EmpresaController(EmpresaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Empresa> listar() {
        return service.listar();
    }

    @PostMapping
    public Empresa salvar(@RequestBody Empresa empresa) {
        return service.salvar(empresa);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
