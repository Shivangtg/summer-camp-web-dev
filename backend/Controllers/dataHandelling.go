package controllers

import (
	models "PROJECT/backend/Models"
	utility "PROJECT/backend/Utility"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewDP(db *gorm.DB,authSecretKey string) func(c *gin.Context){
	return func(c *gin.Context){
		var req models.ImageReq
		err:=c.BindJSON(req)
		if err!=nil{
			fmt.Println("Error occoured",err)
			c.JSON(http.StatusInternalServerError,gin.H{"error":err})
			return
		}
		toDecode,err:=c.Request.Cookie("authToken")
		if(err!=nil){
			fmt.Println("error getting the authToken",err.Error());
			c.JSON(http.StatusBadRequest,gin.H{"message":"error getting the authToken","error":err.Error()})
			return
		}
		decoded,er:=utility.DecodingToken(string(toDecode.Value),authSecretKey)
		if er!=nil{
			fmt.Println(er)
			return 
		}

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		        //getting body for the 
		        // resolutiuon of issue
				
				//well here we basically try
				//to match the usercontext present in the 
				//frontend with the authToken that is present

				if(decoded["useremail"]!=req.Varifier){
					authTokenString,err:=utility.GenerateAuthToken(req.Varifier,authSecretKey,time.Now().Add(time.Hour*24))
					if err!=nil{
						fmt.Println("error in generating auth token")
						c.JSON(http.StatusBadRequest,gin.H{"message":"error in generating auth token","error":err})
						return
					}
					c.SetCookie("authToken",authTokenString,24*3600,"/","localhost",false,false)
				}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var user models.User
		retrivedUser:=db.Where("useremail = ?",req.Varifier).First(&user)
		if retrivedUser.Error!=nil{
			fmt.Println("cann't retreive User",retrivedUser)
			c.JSON(http.StatusInternalServerError,gin.H{"message":"unable to retreive user","error":"unable to retreive user"})
			return 
		}
		
	}
}