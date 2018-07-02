import { DialogService } from './../../base/dialog.service';
import { ConfigurationService, Configuration } from './../../configuration/configuration.service';
import { MissService, Miss } from './../miss.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'miss-payment',
  templateUrl: 'miss-payment.component.html',
  providers: [
    ConfigurationService,
    DialogService
  ],
  styleUrls: [
    '../../main/table.scss'
  ]
})
export class MissPaymentComponent implements OnInit {
  misses: any[];
  configuration: Configuration = new Configuration();

  constructor(
    private missService: MissService,
    private configurationService: ConfigurationService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.initializeMisses();
    this.configurationService.getConfigurationProperties()
      .then(properties => {
        properties.forEach(item => {
          this.configuration[item.keyName] = item.value;
        });
      });
  }

  private initializeMisses() {
    this.missService.getAll().then(misses => {
      this.misses = misses;
    });
  }

  calculateOldBond(miss: Miss) {
    const startDate = new Date(miss.startDate);
    const now = new Date();
    let currentMultiplier;
    let previousMultiplier;
    const previousDate = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    currentMultiplier = this.calculateBondMultpliyer(years, months);

    previousDate.setMonth(previousDate.getMonth() - 1);
    years = previousDate.getFullYear() - startDate.getFullYear();
    months = previousDate.getMonth() - startDate.getMonth();

    previousMultiplier = this.calculateBondMultpliyer(years, months);

    const bond = (this.configuration.minNationalSalary * currentMultiplier * 3) -
      (this.configuration.previousMinNationalSalary * previousMultiplier * 3);

    return bond;
  }

  calculateBondMultpliyer(years: number, months: number) {
    let multiplier;
    if ( (years === 2 && months >= 0) || ( years > 2 && years < 5 ) || ( years === 5 && months < 0 ) ) {
      multiplier = 0.05;
    } else if ( (years === 5 && months >= 0 ) || (years > 5 ) ) {
      multiplier = 0.11;
    } else {
      multiplier = 0;
    }

    return multiplier;
  }

  updatePaymentValues() {
    const config = this.configuration;

    this.dialogService.updatePayment().subscribe(doUpdate => {
      if (doUpdate) {
        const newMissData = this.misses.map(miss => {
          return {
            id: miss.id,
            salary: +(miss.salary +
                  (config.minNationalSalary * config.salaryIncreasePercentage / 100) + this.calculateOldBond(miss)).toFixed(2)
          };
        });

        this.missService.updateSalaries(newMissData).then(() => {
          this.initializeMisses();
        });
      }
    });
  }
}
