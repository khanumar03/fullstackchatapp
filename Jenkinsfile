pipeline {
    agent any

    stages {
        stage("Build") {
            steps {
                 withCredentials([usernamePassword(credentialsId: "dockerHub", passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]) {
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                }
                sh "ls"
                sh "docker-compose --verbose build"
                sh "docker images"
            }
        }

        stage("test") {
            steps {

            echo "testing"
            }
        }

        stage("Deployment") {
            steps {
                dir ("build") {
                       withCredentials([string(credentialsId: 'DATABASEURL',  variable: 'D_KEY'),string(credentialsId: 'CLERK_KEY',  variable: 'C_KEY')]) {
                       sh "export DATABASEURL=${D_KEY}"
                       sh "export CLERKKEY=${D_KEY}"
                    //    sh "docker compose up"
                       sh "docker logout"
                 }
                    
                }
            }
        }
    }
}