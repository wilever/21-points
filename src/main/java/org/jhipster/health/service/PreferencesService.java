package org.jhipster.health.service;

import org.jhipster.health.domain.Preferences;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Preferences.
 */
public interface PreferencesService {

    /**
     * Save a preferences.
     *
     * @param preferences the entity to save
     * @return the persisted entity
     */
    Preferences save(Preferences preferences);

    /**
     * Get all the preferences.
     *
     * @return the list of entities
     */
    List<Preferences> findAll();


    /**
     * Get the "id" preferences.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Preferences> findOne(Long id);

    /**
     * Delete the "id" preferences.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
