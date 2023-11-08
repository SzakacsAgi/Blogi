# Blogi

The project is an application that simulates a blog. 

# Features: 
1. Sign in:
   1. Via GitHub
   2. Via Google
2. Admin user can: 
   1. Create a new article 
   2. Update articles
   3. Delete articles
3. Usual logged-in user can: 
   1. Write comments 
   2. Update comments 
   3. Delete comments 
4. All user can: 
   1. Read articles 
   2. Read comments
   3. Filter articles
   4. Search between articles

# Technologies: 
1. Backend uses Spring-Boot, Java 17, Maven, and Docker
2. Frontend uses HTML, CSS, JavaScript, and Bootstrap framework

# How to build the application:
``sudo docker compose build``

# How to start the application:
``sudo docker compose up``

# After you start the application, you can reach it at:
``http://localhost:8080/blogi/home``