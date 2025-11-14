package br.com.portalestagios.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.portalestagios.entity.Empresa;
import br.com.portalestagios.entity.Usuario;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByUsuario(Usuario usuario);
}
