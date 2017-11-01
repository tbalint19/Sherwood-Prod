package com.base.emailservice.repository;

import com.base.emailservice.model.SendAttempt;
import org.springframework.data.repository.CrudRepository;

public interface SendAttemptRepository extends CrudRepository<SendAttempt, Long> {


}
