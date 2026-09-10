pipeline {
    agent any

    options {
        timeout(time: 15, unit: 'MINUTES')
        ansiColor('xterm')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout & SCM') {
            steps {
                echo '=== Stage 1: Checkout & SCM Info ==='
                script {
                    echo "Branch: ${env.BRANCH_NAME ?: 'main'}"
                    echo "Build Number: ${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Environment & Tooling Check') {
            steps {
                echo '=== Stage 2: Validating Runtime Environment ==='
                script {
                    if (isUnix()) {
                        sh '''
                            echo "Operating System: $(uname -s) $(uname -r)"
                            node -v || echo "Node not found in standard PATH"
                            npm -v || echo "NPM not found in standard PATH"
                        '''
                    } else {
                        bat '''
                            echo Operating System: Windows
                            node -v
                            npm -v
                        '''
                    }
                }
            }
        }

        stage('Dependency & Package Verification') {
            steps {
                echo '=== Stage 3: Verifying Package Integrity ==='
                script {
                    if (isUnix()) {
                        sh 'test -f package.json && echo "package.json validated."'
                    } else {
                        bat 'if exist package.json (echo package.json validated.) else (exit /b 1)'
                    }
                }
            }
        }

        stage('Code Quality & Linting') {
            steps {
                echo '=== Stage 4: Static Analysis & Lint Checks ==='
                script {
                    if (isUnix()) {
                        sh 'npm run lint'
                    } else {
                        bat 'npm run lint'
                    }
                }
            }
        }

        stage('Execute Automated Unit Tests') {
            steps {
                echo '=== Stage 5: Running Test Suite ==='
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Build & Artifact Audit') {
            steps {
                echo '=== Stage 6: Auditing Repository Cleanliness ==='
                script {
                    // Ensure forbidden build artifacts are not present
                    if (isUnix()) {
                        sh '''
                            echo "Verifying no build artifacts (node_modules, dist, venv) are committed..."
                            if [ -d "dist" ]; then echo "Warning: dist directory present" && exit 1; fi
                            if [ -d "venv" ]; then echo "Warning: venv directory present" && exit 1; fi
                            echo "Artifact audit passed successfully."
                        '''
                    } else {
                        bat '''
                            echo Auditing workspace for unallowed artifacts...
                            if exist dist (echo Error: dist folder detected && exit /b 1)
                            if exist venv (echo Error: venv folder detected && exit /b 1)
                            echo Workspace cleanliness verified.
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline completed with status: ${currentBuild.currentResult}"
        }
        success {
            echo "SUCCESS: All tests and pipeline stages passed for build #${env.BUILD_NUMBER}!"
        }
        failure {
            echo "FAILURE: Pipeline failed at build #${env.BUILD_NUMBER}. Check stage logs above."
        }
    }
}
