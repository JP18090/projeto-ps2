package br.com.portalestagios.repository;

import br.com.portalestagios.entity.Estudante;
import br.com.portalestagios.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EstudanteRepository extends JpaRepository<Estudante, Long> {
    Optional<Estudante> findByUsuario(Usuario usuario);
}
