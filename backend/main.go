package main

import (
	controllers "PROJECT/backend/Controllers"
	database "PROJECT/backend/Database"
	models "PROJECT/backend/Models"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main(){
	err:=godotenv.Load()
	if err!=nil{
		log.Fatal("Error loading .env file")
	}
	DB_User_Name:=os.Getenv("DB_User_NAME")
	DB_User_Password:=os.Getenv("DB_User_PASSWORD")
	DB_Name:=os.Getenv("DB_NAME")
	ssl_Mode:=os.Getenv("SSL_MODE")
	frontendURL:=os.Getenv("FRONTEND_URL")
	authSecretKey:=os.Getenv("AUTH_SECRET_KEY")
	listeningPort:=os.Getenv("Port")
	r := gin.Default()

	// CORS middleware configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{frontendURL}, // Frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length","Set-Cookie"},
		AllowCredentials: true, // Allow cookies & authentication headers
		MaxAge:           12 * time.Hour,
	}))

	db:=database.ConnectToDB(DB_User_Name,DB_User_Password,DB_Name,ssl_Mode)

	db.AutoMigrate(&models.User{})

	r.POST("/login",controllers.Login(db,authSecretKey))
	r.POST("/signup",controllers.Signup(db,authSecretKey))
	r.Run(listeningPort)
}