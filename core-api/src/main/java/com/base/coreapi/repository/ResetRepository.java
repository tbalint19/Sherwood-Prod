package com.base.coreapi.repository;

import com.base.coreapi.model.auth.Reset;
import org.springframework.data.repository.CrudRepository;

public interface ResetRepository extends CrudRepository<Reset, Long> {

    Reset findByCode(String code);
}
