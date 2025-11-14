package br.com.portalestagios.repository;

import br.com.portalestagios.entity.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VagaRepository extends JpaRepository<Vaga, Long> {
    // Define methods for database operations related to Vaga
}