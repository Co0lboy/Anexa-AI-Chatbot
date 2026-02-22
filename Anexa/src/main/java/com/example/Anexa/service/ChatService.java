package com.example.Anexa.service;

import com.example.Anexa.model.ChatLog;
import com.example.Anexa.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class ChatService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final ChatRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    public ChatService(ChatRepository repository) {
        this.repository = repository;
    }

    public String getAIResponse(String userMessage) {
        // 1. Setup Request Body
        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-3.5-turbo");
        body.put("messages", List.of(Map.of("role", "user", "content", userMessage)));

        // 2. Setup Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            // 3. Call OpenAI API
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);
            List<Map> choices = (List<Map>) response.getBody().get("choices");
            String aiResponse = (String) ((Map) choices.get(0).get("message")).get("content");

            // 4. Save to Database
            ChatLog log = new ChatLog();
            log.setUserMessage(userMessage);
            log.setAiResponse(aiResponse);
            repository.save(log);

            return aiResponse;
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
