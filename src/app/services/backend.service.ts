import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = `${environment.backend_url}/api`;
  private readonly COMMON_OPTIONS: any = {
    observe: 'response'
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  private getAuthorizationHeader() {
    return {
      Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  saveJwt(jwt) {
    sessionStorage.setItem('jwt', jwt);
  }

  checkJwt(params?) {
    let url = `${this.baseUrl}/auth/token/`;
    return this.http.get(url, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params});
  }

  getKeysStore(params?) {
    let url = `${this.baseUrl}/auth/k_store/`;
    return this.http.get(url, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params});
  }

  getKeyStore(key, params?) {
    let url = `${this.baseUrl}/auth/k_store/${key}`;
    return this.http.get(url, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params});
  }

  putKeyStore(key, value, params?) {
    let url = `${this.baseUrl}/auth/k_store/${key}`;
    return this.http.put(url, value, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params});
  }

  getUserByToken(params?) {
    let url = `${this.baseUrl}/auth/token/user/`;
    const token = sessionStorage.getItem('jwt');
    return this.http.get(url, {
      ...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params: {...params, token}
    });
  }

  changePassword(value, params?) {
    let url = `${this.baseUrl}/auth/passwd/`;
    return this.http.post(url, value, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params});
  }

  loginStaff(value, params?) {
    let url = `${this.baseUrl}/auth/staff`;
    let body = new URLSearchParams();
    body.set('username', value.username);
    body.set('password', value.password);
    return this.http.post(url, body, {
      ...this.COMMON_OPTIONS,
      params,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
  }

  logoutWithJWT(jwt) {
    let url = `${this.baseUrl}/auth/`;
    return this.http.delete(url, {...this.COMMON_OPTIONS, headers: {Authorization: `Bearer ${jwt}`}})
  }

  logout() {
    let url = `${this.baseUrl}/auth/`;
    return this.http.delete(url, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}})
  }

  forgotPassword(value) {
    let url = `${this.baseUrl}/auth/forgot`;
    return this.http.post(url, value, {...this.COMMON_OPTIONS, params: value});
  }

  getAccounts(id?, params?) {
    let url = `${this.baseUrl}/accounts/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  postAccount(value: any, params?) {
    let url = `${this.baseUrl}/accounts/`;
    return this.http.post(url, value, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params: params});
  }

  putAccounts(id, value, params?) {
    let url = `${this.baseUrl}/accounts/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.put(url, value, {
      ...this.COMMON_OPTIONS,
      params: params,
      headers: {...this.getAuthorizationHeader()}
    });
  }

  deleteAccount(id, params?) {
    let url = `${this.baseUrl}/accounts/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.delete(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getAccountPersons(accountId, id?, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/persons/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  putAccountPersons(accountId, id, value, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/persons/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.put(url, value, {
      ...this.COMMON_OPTIONS,
      params: params,
      headers: {...this.getAuthorizationHeader()}
    });
  }

  postAccountPerson(accountId, value, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/persons/`;
    return this.http.post(url, value, {
      ...this.COMMON_OPTIONS,
      params: params,
      headers: {...this.getAuthorizationHeader()}
    });
  }

  deleteAccountPerson(accountId, id, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/persons/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.delete(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  inviteAccountPersonStaff(accountId, value) {
    let url = `${this.baseUrl}/auth/invite`;
    return this.http.post(url, value, {
      ...this.COMMON_OPTIONS,
      params: {account_id: accountId},
      headers: {...this.getAuthorizationHeader()}
    });
  }

  acceptUserInvitation(value, params?) {
    let url = `${this.baseUrl}/auth/tp`;
    return this.http.post(url, value, {...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params: params});
  }

  changeUserPassword(value, jwt, params?) {
    let url = `${this.baseUrl}/auth/passwd`;
    return this.http.post(url, value, {
      ...this.COMMON_OPTIONS,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      params: params
    });
  }

  getAccountProperties(accountId, id?, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  postAccountProperty(accountId, value, params?) {
    const url = `${this.baseUrl}/accounts/${accountId}/properties/`;
    return this.http.post(url, value, {
      ...this.COMMON_OPTIONS,
      params: params,
      headers: {...this.getAuthorizationHeader()}
    });
  }

  putAccountProperty(accountId, id, value, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.put(url, value, {
      ...this.COMMON_OPTIONS,
      params: params,
      headers: {...this.getAuthorizationHeader()}
    });
  }

  deleteAccountProperties(accountId, id?, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.delete(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getAccountKiosks(accountId, id?, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/kiosks/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  postAccountKiosk(accountId, value, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/kiosks/`;
    return this.http.post(url, value, {
      ...this.COMMON_OPTIONS,
      params: params,
      headers: {...this.getAuthorizationHeader()}
    });
  }

  putAccountKiosk(accountId, id, value, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/kiosks/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.put(url, value, {
      ...this.COMMON_OPTIONS,
      params: params,
      headers: {...this.getAuthorizationHeader()}
    });
  }

  deleteAccountKiosk(accountId, id, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/kiosks/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.delete(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getAccountPropertyResources(accountId, propertyId, id?, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/${propertyId}/resources/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getPropertyResourcesLock(accountId, propertyId, id, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/${propertyId}/resources/${id}/lock_status`;
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getAccountPropertyCustomers(accountId, propertyId, id?, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/${propertyId}/customers/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getAccountPropertyReservations(accountId, propertyId, id?, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/${propertyId}/reservations/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getReservationClients(accountId, propertyId, id, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/${propertyId}/reservations/${id}/customers/`;
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  getKiosksUnidentified(params?) {
    let url = `${this.baseUrl}/auth/kiosks/unidentified/`;
    return this.http.get(url, {
      ...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params: {...params}
    });
  }

  postKioskActivate(value, params?) {
    let url = `${this.baseUrl}/auth/kiosks/activate/`;
    return this.http.post(url, value, {
      ...this.COMMON_OPTIONS, headers: {...this.getAuthorizationHeader()}, params: {...params}
    });
  }

  getDevice(account_id, property_id, id?, params?) {
    let url = `${this.baseUrl}/accounts/${account_id}/properties/${property_id}/devices/`;
    if (id) {
      url += `${id}`;
    }
    return this.http.get(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  // DANGER ZONE - Disable real calls until thoroughly tested

  postKeyCutter(account_id, property_id, device_id, params?) {
    let url = `${this.baseUrl}/accounts/${account_id}/properties/${property_id}/devices/${device_id}/keys/physical/`;
    console.log("POST "+url+"; "+JSON.stringify(params));
    //return this.http.post(url, {}, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

  postPropertyResourcesLock(accountId, propertyId, id, params?) {
    let url = `${this.baseUrl}/accounts/${accountId}/properties/${propertyId}/resources/${id}/lock_status`;
    console.log("POST "+url+"; "+JSON.stringify(params));
    //return this.http.post(url, {...this.COMMON_OPTIONS, params: params, headers: {...this.getAuthorizationHeader()}});
  }

}
