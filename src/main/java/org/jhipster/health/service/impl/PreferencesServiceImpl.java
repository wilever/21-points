package org.jhipster.health.service.impl;

import org.jhipster.health.service.PreferencesService;
import org.jhipster.health.domain.Preferences;
import org.jhipster.health.repository.PreferencesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Preferences.
 */
@Service
@Transactional
public class PreferencesServiceImpl implements PreferencesService {

    private final Logger log = LoggerFactory.getLogger(PreferencesServiceImpl.class);

    private final PreferencesRepository preferencesRepository;

    public PreferencesServiceImpl(PreferencesRepository preferencesRepository) {
        this.preferencesRepository = preferencesRepository;
    }

    /**
     * Save a preferences.
     *
     * @param preferences the entity to save
     * @return the persisted entity
     */
    @Override
    public Preferences save(Preferences preferences) {
        log.debug("Request to save Preferences : {}", preferences);
        return preferencesRepository.save(preferences);
    }

    /**
     * Get all the preferences.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Preferences> findAll() {
        log.debug("Request to get all Preferences");
        return preferencesRepository.findAll();
    }


    /**
     * Get one preferences by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Preferences> findOne(Long id) {
        log.debug("Request to get Preferences : {}", id);
        return preferencesRepository.findById(id);
    }

    /**
     * Delete the preferences by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Preferences : {}", id);        preferencesRepository.deleteById(id);
    }
}
