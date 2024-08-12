pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/tu_usuario/tu_repositorio.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Comando de instalación de dependencias (ajusta según tu proyecto)
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test' // Comando para ejecutar pruebas automatizadas
            }
        }
        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: '**/test-results/*.xml', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            junit '**/test-results/*.xml'
        }
    }
}
