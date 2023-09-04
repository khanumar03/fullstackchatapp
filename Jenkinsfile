pipeline {
    agent any

    stages {
        stage("Build") {
            steps  {
                sh 'ls'
                sh 'docker -v'
                withCredentials([string(credentialsId: 'DATABASEURL',  variable: 'KEY_1')]) {
                    sh 'export DATABASEURL=${KEY_1}'
                }
            }
        }

        stage("test") {
            steps {
                 withCredentials([usernamePassword(credentialsId: "dockerHub", passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]) {
                    sh 'docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}'
                    sh 'docker logout'
                }
                echo 'testing'
            }
        }

        stage("Deployment") {
            steps {
                dir ("build") {
                    sh 'ls'
                }
            }
        }
    }
}