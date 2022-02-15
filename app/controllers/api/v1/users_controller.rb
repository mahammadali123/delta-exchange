module Api
    module V1
        class UsersController < ApplicationController   
            protect_from_forgery with: :null_session
            
            def index
                user=User.all
                render json: UserSerializer.new(user).serialized_json
            end

            def new
                logger.debug "#{params[:email]}PWD #{params[:password]}"
                user=User.find_by(email: params[:userName])
        

                if user
                    render json: {message: "#{params[:userName]} Already Exist",status:422}
                else
                    user=User.new(email: params[:userName],password: params[:password],isAuthenticated: true)
                    if user.save
                        render json: {status: 200,message: "User Created Successfully"}
                    else
                        render json: {status: 422,message: "User Creation Failed"}
                    end
                end
            end

            def create
                user=User.find_by(email: user_params[:userName])
                if user && user.password == user_params[:password] 
                        user.update(isAuthenticated: true)
                    render json: {status: 200,message: "Success",user: user.isAuthenticated}
                else
                    render json: {status: 422, message: "Failed" }
                end
            end

            def show
                logger.debug "Email #{User.exists?(email: "smd.alirct@gmail.com")}"
                user=User.find_by(email: params[:email])
                if user
                    render json: {message: "Success", isAuthenticated: user.isAuthenticated}
                else
                    render json: {message: "Falied",isAuthenticated: false}
                end
            end

             def edit
                user=User.find_by(email: params[:email])
                if user && user.isAuthenticated
                    user.update(isAuthenticated: false)
                    render json: {status: 200,message: "Logout Successfull"}
                else
                    render json: {message: "Logout Failed"}
                end
            end

            private

            def user_params
                params.require(:user).permit(:userName,:password)
            end
        end
    end
end