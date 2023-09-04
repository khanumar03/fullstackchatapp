pipeline {
    agent any

    stages {
        stage("Build") {
            steps  {
                sh 'ls'
                sh 'docker -v'
                withCredentials([string(credentialsId: 'DATABASEURL',  variable: 'KEY_1')]) {
                    sh 'export DATABASEURL="${KEY_1}"'
                }
                withCredentials(usernamePassword([credentialsId: "dockerHub", passwordVariable:"dhpass",usernameVariable: "dhusername"])) {
                    sh 'docker login -u ${env.dhpass} -p ${env.dhusername}'
                    sh 'docker logout'
                }
            }
        }

        stage("test") {
            steps {
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