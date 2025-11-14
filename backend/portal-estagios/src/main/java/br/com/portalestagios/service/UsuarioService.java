package br.com.portalestagios.service;

import br.com.portalestagios.dao.UsuarioDAO;
import br.com.portalestagios.entity.Usuario;
import br.com.portalestagios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioDAO usuarioDAO;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, UsuarioDAO usuarioDAO) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioDAO = usuarioDAO;
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> update(Long id, Usuario usuario) {
        return usuarioRepository.findById(id).map(existing -> {
            usuario.setId(existing.getId());
            return usuarioRepository.save(usuario);
        });
    }

    public boolean delete(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
