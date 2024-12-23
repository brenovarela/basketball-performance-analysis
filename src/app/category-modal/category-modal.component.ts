import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})

export class CategoryModalComponent {
  public data?: { category: string, selected_point: any, home_players: any, away_players: any};  // Inicializa a variável data

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit() {
    if (this.data) {
      console.log(this.data.selected_point);
      console.log(this.data.category);
      this.buildPlayerContributionCharts(this.data.selected_point, this.data.category, this.data.home_players, this.data.away_players);
    }
  }

  // Função para construir gráficos
  buildPlayerContributionCharts(selected_point: any, category: string = "efg", home_players: any, away_players: any) {
    const categoryMapping: { [key: string]: string } = {
        'eFG%': 'efg',
        'TOV%': 'tov',
        'ORB%': 'orb',
        'DRB%': 'drb',
        'FT%': 'ft'
    };

    const mappedCategory = categoryMapping[category];
    const homePlayers = selected_point.players.home;
    const awayPlayers = selected_point.players.away;

    let homeTotal = 0;
    let awayTotal = 0;

    // Arrays para armazenar as contribuições dos jogadores
    const homeContributions: any[] = [];
    const awayContributions: any[] = [];

    // Soma as contribuições dos jogadores de "home"
    Object.keys(homePlayers).forEach(playerId => {
        const playerValue = homePlayers[playerId]?.[mappedCategory] || 0; // Verifica se o valor existe, caso contrário, usa 0
        if (playerValue > 0.01) {  // Inclui apenas jogadores com valores maiores que zero
            homeContributions.push({ name: `${playerId}`, value: playerValue });
            homeTotal += playerValue;
        }
    });
    
    // Soma as contribuições dos jogadores de "away"
    Object.keys(awayPlayers).forEach(playerId => {
        const playerValue = awayPlayers[playerId]?.[mappedCategory] || 0; // Verifica se o valor existe, caso contrário, usa 0
        if (playerValue > 0.01) {  // Inclui apenas jogadores com valores maiores que zero
            awayContributions.push({ name: `${playerId}`, value: playerValue });
            awayTotal += playerValue;
        }
    });

    // Verifica a diferença para o valor do time "home" e "away"
    const homeTeamTotal = selected_point.home[mappedCategory];
    const awayTeamTotal = selected_point.away[mappedCategory];

    if (homeTotal < homeTeamTotal) {
      // Adiciona a categoria "Team" para completar a contribuição
      homeContributions.push({ name: 'Team', value: homeTeamTotal - homeTotal });
    }

    if (awayTotal < awayTeamTotal) {
      // Adiciona a categoria "Team" para completar a contribuição
      awayContributions.push({ name: 'Team', value: awayTeamTotal - awayTotal });
    }
    console.log(homeContributions)
    // Gera os gráficos para "home" e "away"
    this.createChart('home-chart-container', 'Home Team Contributions', homeContributions, home_players);
    this.createChart('away-chart-container', 'Away Team Contributions', awayContributions, away_players);
  }

  // Função para criar um gráfico de barras simples para as contribuições dos jogadores
  createChart(containerId: string, title: string, data: any[], team_players:any) {
    const categories = ['Team']; // Uma única categoria para o time
    const series = data.map((item, index) => {
      // Encontra o jogador correspondente em team_players usando o item.id
      const player = team_players.find((player: any) => Number(player.id) === Number(item.name));
      const nickname = player ? player.nickname : 'Unknown'; // Usa o nickname ou 'Unknown' se não encontrar
      const color = player ? player.color : '#FFFFFF'; // Usa o nickname ou 'Unknown' se não encontrar

      return {
          type: 'bar' as const,  // Corrigido para garantir que o tipo seja compatível
          name: nickname,  // Nome do jogador baseado no nickname
          data: [item.value * 100],  // Valor do jogador
          color: color // Atribui cores diferentes para cada jogador
      };
   });
  
    Highcharts.chart(containerId, {
      chart: {
        type: 'bar'
      },
      title: {
        text: title
      },
      xAxis: {
        categories: categories,  // Apenas uma barra empilhada
        title: {
          text: ''
        }
      },
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Contribution'
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (
              Highcharts.defaultOptions?.title?.style?.color // Verificação para garantir que o título e estilo existam
            ) || 'gray'
          },
          formatter: function () {
            return `${this.total.toFixed(1)}%`;  // Exibe o total com uma casa decimal
          }
        }
      },
      series: series as Highcharts.SeriesOptionsType[],  // Garantindo que series seja do tipo correto
      plotOptions: {
        bar: {
          stacking: 'normal',  // Empilhamento normal
          dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%',
              style: {
                textOutline: 'none'
              }
          },
        }
      }
    });
  }
}
