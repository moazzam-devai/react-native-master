import React, {createContext, PureComponent, useContext} from 'react';
import {User} from '../../interfaces';
import {SecureStorage} from '../../utility';
import {axiosInstance} from '../../api/axiosInstance';

interface State {
  user: User;
  isAuthenticated: boolean;
  isInitialised: boolean;
}

interface Actions {
  updateUser(user: User, access_token?: string): void;
}

interface AuthContextInterface {
  state: State;
  actions: Actions;
}

const AuthContext = createContext<AuthContextInterface>(null);
export const useAuthContext = () => useContext(AuthContext);
export class AuthContextProvider extends PureComponent<any, State> {
  state: State = {
    user: null,
    isAuthenticated: false,
    isInitialised: false,
  };

  constructor(props: any) {
    super(props);
    this.interceptors();
  }

  componentDidMount() {
    setTimeout(async () => {
      const user = await SecureStorage.getItemAsync('current-user');
      if (user) {
        this.setState(
          {user, isInitialised: true, isAuthenticated: true},
          () => {
            this.getLatestUser();
          },
        );
      } else {
        this.setState({
          user: null,
          isInitialised: true,
          isAuthenticated: false,
        });
      }
    }, 2000);
  }

  async getLatestUser(): Promise<void> {}

  interceptors() {
    axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error?.response?.status === 401) {
          this.updateUser(null);
        }
        return Promise.reject(error);
      },
    );
  }

  async updateUser(user: User, access_token?: string) {
    if (user) {
      await SecureStorage.setItemAsync('current-user', user);
      if (access_token) {
        await SecureStorage.setItemAsync('access-token', access_token);
      }
      this.setState({user, isAuthenticated: true});
    } else {
      await SecureStorage.deleteItemAsync('current-user');
      await SecureStorage.deleteItemAsync('access-token');
      this.setState({user: null, isAuthenticated: false});
    }
  }

  render() {
    const context: AuthContextInterface = {
      state: this.state,
      actions: {
        updateUser: this.updateUser.bind(this),
      },
    };
    return (
      <AuthContext.Provider value={context}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
