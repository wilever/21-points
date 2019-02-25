package org.jhipster.health.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A MyUser.
 */
@Entity
@Table(name = "my_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MyUser implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @OneToOne
    @JoinColumn(unique = true)
    private Preferences myuser;

    @OneToMany(mappedBy = "myUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Points> myusers = new HashSet<>();
    @OneToMany(mappedBy = "myUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Weight> myusers = new HashSet<>();
    @OneToMany(mappedBy = "myUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<BloodPressure> myusers = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public MyUser name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public MyUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Preferences getMyuser() {
        return myuser;
    }

    public MyUser myuser(Preferences preferences) {
        this.myuser = preferences;
        return this;
    }

    public void setMyuser(Preferences preferences) {
        this.myuser = preferences;
    }

    public Set<Points> getMyusers() {
        return myusers;
    }

    public MyUser myusers(Set<Points> points) {
        this.myusers = points;
        return this;
    }

    public MyUser addMyuser(Points points) {
        this.myusers.add(points);
        points.setMyUser(this);
        return this;
    }

    public MyUser removeMyuser(Points points) {
        this.myusers.remove(points);
        points.setMyUser(null);
        return this;
    }

    public void setMyusers(Set<Points> points) {
        this.myusers = points;
    }

    public Set<Weight> getMyusers() {
        return myusers;
    }

    public MyUser myusers(Set<Weight> weights) {
        this.myusers = weights;
        return this;
    }

    public MyUser addMyuser(Weight weight) {
        this.myusers.add(weight);
        weight.setMyUser(this);
        return this;
    }

    public MyUser removeMyuser(Weight weight) {
        this.myusers.remove(weight);
        weight.setMyUser(null);
        return this;
    }

    public void setMyusers(Set<Weight> weights) {
        this.myusers = weights;
    }

    public Set<BloodPressure> getMyusers() {
        return myusers;
    }

    public MyUser myusers(Set<BloodPressure> bloodPressures) {
        this.myusers = bloodPressures;
        return this;
    }

    public MyUser addMyuser(BloodPressure bloodPressure) {
        this.myusers.add(bloodPressure);
        bloodPressure.setMyUser(this);
        return this;
    }

    public MyUser removeMyuser(BloodPressure bloodPressure) {
        this.myusers.remove(bloodPressure);
        bloodPressure.setMyUser(null);
        return this;
    }

    public void setMyusers(Set<BloodPressure> bloodPressures) {
        this.myusers = bloodPressures;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MyUser myUser = (MyUser) o;
        if (myUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), myUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MyUser{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
