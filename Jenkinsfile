pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "sathishrameshkiaq/nodejs-app"
        DOCKER_TAG = "${BUILD_TAG}"
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git branch: 'feature-1', credentialsId: 'Github-ID', url: 'https://github.com/sathishrameshkiaq/java-app.git'
            }
        }
        stage('Build Stage') {
            steps {
                sh 'docker build -t  ${DOCKER_IMAGE}:${DOCKER_TAG} .'
            }
        }
        stage('Docker Login & Push to hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKER_CREDENTIAL', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh """
                          echo "$DOCKER_PASS" | docker login -u '$DOCKER_USER' --password-stdin
                          docker push ${DOCKER_IMAGE}:${DOCKER_TAG} 
                          docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG}"""
                }
            }        
        }
        stage('Deploy Docker Container') {
            steps {
                 sh 'docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}'
            }
        }
    }
    post {
        always {
              echo "Performing post deployment tasks.."
              sh 'docker logout'
        }
    }
}