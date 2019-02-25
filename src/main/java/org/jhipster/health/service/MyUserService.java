package org.jhipster.health.service;

import org.jhipster.health.domain.MyUser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing MyUser.
 */
public interface MyUserService {

    /**
     * Save a myUser.
     *
     * @param myUser the entity to save
     * @return the persisted entity
     */
    MyUser save(MyUser myUser);

    /**
     * Get all the myUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<MyUser> findAll(Pageable pageable);


    /**
     * Get the "id" myUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MyUser> findOne(Long id);

    /**
     * Delete the "id" myUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
