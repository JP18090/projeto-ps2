package br.com.portalestagios.service;

import br.com.portalestagios.dto.VagaCreateRequest;
import br.com.portalestagios.entity.AreaInteresse;
import br.com.portalestagios.entity.Empresa;
import br.com.portalestagios.entity.Vaga;
import br.com.portalestagios.repository.AreaInteresseRepository;
import br.com.portalestagios.repository.EmpresaRepository;
import br.com.portalestagios.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VagaService {

    @Autowired
    private VagaRepository vagaRepository;
    
    @Autowired
    private AreaInteresseRepository areaInteresseRepository;
    
    @Autowired
    private EmpresaRepository empresaRepository;
    
    public List<Vaga> findAll() {
        return vagaRepository.findAll();
    }

    public Optional<Vaga> findById(Long id) {
        return vagaRepository.findById(id);
    }

    public Vaga save(Vaga vaga) {
        return vagaRepository.save(vaga);
    }
    
    public Vaga createVaga(VagaCreateRequest request) {
        AreaInteresse area = areaInteresseRepository.findById(request.getAreaId())
            .orElseThrow(() -> new IllegalArgumentException("Área não encontrada: " + request.getAreaId()));
            
        Empresa empresa = empresaRepository.findById(request.getEmpresaId())
            .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada: " + request.getEmpresaId()));
        
        Vaga vaga = Vaga.builder()
            .titulo(request.getTitulo())
            .descricao(request.getDescricao())
            .area(area)
            .localizacao(request.getLocalizacao())
            .modalidade(request.getModalidade())
            .cargaHoraria(request.getCargaHoraria())
            .requisitos(request.getRequisitos())
            .empresa(empresa)
            .encerrada(false)
            .build();
            
        return vagaRepository.save(vaga);
    }

    public Optional<Vaga> update(Long id, Vaga vaga) {
        return vagaRepository.findById(id).map(existing -> {
            vaga.setId(existing.getId());
            return vagaRepository.save(vaga);
        });
    }

    public boolean delete(Long id) {
        if (vagaRepository.existsById(id)) {
            vagaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
