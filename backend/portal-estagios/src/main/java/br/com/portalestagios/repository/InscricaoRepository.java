package br.com.portalestagios.repository;

import br.com.portalestagios.entity.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {
    List<Inscricao> findAllByEstudanteId(Long estudanteId);
    List<Inscricao> findAllByVagaId(Long vagaId);
    boolean existsByVagaIdAndEstudanteId(Long vagaId, Long estudanteId);
}

