import { ConfigurationService, Configuration } from './configuration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'configuration.component.html',
  providers: [
    ConfigurationService
  ],
  styles: ['.success-message { color: green; margin-left: 10px; font-weight: bold; }'],
  styleUrls: ['../main/container-section.scss']
})

export class ConfigurationComponent implements OnInit {
  configuration: Configuration;
  showMessage: Boolean = false;

  constructor(
    private configurationService: ConfigurationService
  ) {
    this.configuration = new Configuration();
   }

  ngOnInit( ) {
    this.configurationService.getConfigurationProperties()
      .then(properties => {
        const configuration = new Configuration();
        properties.forEach(item => {
          configuration[item.keyName] = item.value;
        });
        this.configuration = configuration;
      });
   }

  onSaveConfiguration() {
    this.configurationService.updateConfigurationProperties(this.configuration)
      .then(() => {
        this.showMessage = true;
        setTimeout( () => {
          this.showMessage = false;
        }, 4000);
      });
  }
}
