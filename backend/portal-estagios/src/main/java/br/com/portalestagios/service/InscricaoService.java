package br.com.portalestagios.service;

import br.com.portalestagios.dao.EstudanteDAO;
import br.com.portalestagios.dao.VagaDAO;
import br.com.portalestagios.dto.InscricaoRequest;
import br.com.portalestagios.dto.InscricaoResponse;
import br.com.portalestagios.entity.Estudante;
import br.com.portalestagios.entity.Inscricao;
import br.com.portalestagios.entity.Vaga;
import br.com.portalestagios.repository.InscricaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InscricaoService {

    @Autowired
    private InscricaoRepository inscricaoRepository;
    
    @Autowired
    private VagaDAO vagaDAO;
    
    @Autowired
    private EstudanteDAO estudanteDAO;

    public List<Inscricao> findAll() {
        return inscricaoRepository.findAll();
    }

    public Optional<Inscricao> findById(Long id) {
        return inscricaoRepository.findById(id);
    }

    public Inscricao save(Inscricao inscricao) {
        return inscricaoRepository.save(inscricao);
    }
    
    public InscricaoResponse createInscricao(InscricaoRequest request) {
        if (inscricaoRepository.existsByVagaIdAndEstudanteId(request.getVagaId(), request.getEstudanteId())) {
            throw new IllegalArgumentException("Estudante já inscrito nesta vaga");
        }
        
        Vaga vaga = vagaDAO.findById(request.getVagaId())
            .orElseThrow(() -> new IllegalArgumentException("Vaga não encontrada"));
        Estudante estudante = estudanteDAO.findById(request.getEstudanteId())
            .orElseThrow(() -> new IllegalArgumentException("Estudante não encontrado"));
        
        Inscricao inscricao = Inscricao.builder()
            .vaga(vaga)
            .estudante(estudante)
            .build();
        
        Inscricao saved = inscricaoRepository.save(inscricao);
        return toResponse(saved);
    }
    
    public List<InscricaoResponse> findByEstudanteId(Long estudanteId) {
        return inscricaoRepository.findAllByEstudanteId(estudanteId)
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }
    
    public List<InscricaoResponse> findByVagaId(Long vagaId) {
        return inscricaoRepository.findAllByVagaId(vagaId)
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }
    
    public boolean existsByVagaAndEstudante(Long vagaId, Long estudanteId) {
        return inscricaoRepository.existsByVagaIdAndEstudanteId(vagaId, estudanteId);
    }
    
    private InscricaoResponse toResponse(Inscricao inscricao) {
        return InscricaoResponse.builder()
            .id(inscricao.getId())
            .vagaId(inscricao.getVaga().getId())
            .vagaTitulo(inscricao.getVaga().getTitulo())
            .empresaNome(inscricao.getVaga().getEmpresa() != null ? inscricao.getVaga().getEmpresa().getNome() : "N/A")
            .estudanteId(inscricao.getEstudante().getId())
            .estudanteNome(inscricao.getEstudante().getNome())
            .build();
    }

    public Optional<Inscricao> update(Long id, Inscricao inscricao) {
        return inscricaoRepository.findById(id).map(existing -> {
            inscricao.setId(existing.getId());
            return inscricaoRepository.save(inscricao);
        });
    }

    public boolean delete(Long id) {
        if (inscricaoRepository.existsById(id)) {
            inscricaoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
