pipeline {
    agent any

    stages {
        stage("Build") {
            steps {
                 withCredentials([usernamePassword(credentialsId: "dockerHub", passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]) {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                }
            }

            steps {
                sh "docker-compose build"
                sh "docker images"
            }
        }

        stage("test") {
            echo "testing"
        }

        stage("Deployment") {
            steps {
                dir ("build") {
                    steps  {
                       withCredentials([string(credentialsId: 'DATABASEURL',  variable: 'D_KEY'),string(credentialsId: 'CLERK_KEY',  variable: 'C_KEY')]) {
                       sh "export DATABASEURL=${D_KEY}"
                       sh "export CLERKKEY=${D_KEY}"
                       sh "docker compose up"
                    }
                 }
                    
                }
            }
        }
    }
}