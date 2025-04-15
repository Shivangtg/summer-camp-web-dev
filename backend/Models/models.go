package models

import (
	"encoding/json"

	"gorm.io/gorm"
)

type Trip []map[string]string

type User struct {
	gorm.Model
	Username   string `json:"username" gorm:"unique;not null"`
	Password   string `json:"password" gorm:"not null"`
	Useremail  string `gorm:"unique;not null" json:"useremail" `
	DP         string `json:"dp"`
	Trips      Trip `json:"trips" gorm:"type:jsonb"`
}

// Implements Scan for reading JSONB data from PostgreSQL
func (j *Trip) Scan(value interface{}) error {
	return json.Unmarshal(value.([]byte), j)
}

// Implements Value for storing JSONB data into PostgreSQL
func (j Trip) Value() (interface{}, error) {
	return json.Marshal(j)
}


type SignupReq struct{
	Username   string `json:"username"`
	Password   string `json:"password"`
	Useremail  string `json:"useremail"`
}


type LoginReq struct{
	Useremail   string `json:"useremail"`
	Password   	string `json:"password"`
}

type ImageReq struct{
	ImageUrl  string `json:"imageurl"`
	Varifier  string `json:"varifier"`
}