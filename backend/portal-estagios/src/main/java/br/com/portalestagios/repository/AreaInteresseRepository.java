package br.com.portalestagios.repository;

import br.com.portalestagios.entity.AreaInteresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreaInteresseRepository extends JpaRepository<AreaInteresse, Long> {
}