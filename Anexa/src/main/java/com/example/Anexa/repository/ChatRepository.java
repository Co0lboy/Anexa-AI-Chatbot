package com.example.Anexa.repository;

import com.example.Anexa.model.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<ChatLog, Long> {
}
