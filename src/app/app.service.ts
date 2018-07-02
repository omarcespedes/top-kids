import { Injectable } from '@angular/core';

@Injectable()
export class SideNavigationService {
    constructor() { }

    getSideMenuSections(){
        return [{
            name: 'Niños',
            url: 'kids',
            icon: 'child_care'
         }, {
            name: 'Misses',
            url: 'misses',
            icon: 'person'
         }, {
            name: 'Cursos',
            url: 'groups',
            icon: 'group'
         }, {
            name: 'Compras Material',
            url: 'purchase/material',
            icon: 'shopping_cart'
         }, {
            name: 'Compras Cocina',
            url: 'purchase/kitchen',
            icon: 'kitchen'
         }, {
            name: 'Difusion',
            url: 'mailing',
            icon: 'email'
         }, {
            name: 'Configuracion',
            url: 'configuration',
            icon: 'settings'
         }, {
            name: 'Logout',
            icon: 'power_settings_new'
         }];
    }
}
