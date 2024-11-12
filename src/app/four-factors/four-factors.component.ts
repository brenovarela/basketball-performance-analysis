// app/four-factors/four-factors.component.ts
import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Importe o NgbModal
import * as Highcharts from 'highcharts';
declare var $: any; // Importação do jQuery para o TypeScript
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalComponent } from '../category-modal/category-modal.component';  // Ajuste conforme necessário


interface FourFactorsMetrics {
    efg: number | null;
    tov: number | null;
    orb: number | null;
    drb: number | null;
    ft: number | null;
    pontos: number | null;
}

interface FourFactorsData {
    elapsed_time: number;
    home: FourFactorsMetrics;
    away: FourFactorsMetrics;
}

@Component({
  selector: 'app-four-factors',
  templateUrl: './four-factors.component.html',
  styleUrls: ['./four-factors.component.scss']
})

export class FourFactorsComponent implements OnInit, AfterViewInit {
    

    constructor(private modalService: NgbModal, private zone: NgZone) {} // Injeção do NgbModal e NgZone
    intervalId: any;

    match_is_ongoing = false

    startInterval(segundos = 10) {
        this.intervalId = setInterval(async () => {
            const selected_league = $('#select-league').val(); // Obtém o valor selecionado
            const selected_team = $('#select-team').val(); // Obtém o valor selecionado
            const selected_match = $('#select-match').val();

            if (selected_match !== null && selected_match !== ''){
                this.is_match_ongoing(selected_league, selected_match)
                if (this.match_is_ongoing){
                    console.log('teste')
                    this.events = await this.getAllMatchEvents(selected_league, selected_team, selected_match); // Chama a função a cada 30 segundos
                    console.log(this.events)
                }

            }
        }, segundos * 1000); // 30000 milissegundos = 30 segundos
    }

    clearInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId); // Limpa o intervalo
        }
    }



    

    home_players = []
    away_players = []

    events = [
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2,
            "code": "IQU",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2000,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2001,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2002,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2003,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2004,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2005,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2006,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2007,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2008,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 2009,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 0,
                "date": "2023-05-15T20:00:52"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 7,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:53",
                    "elapsed_seconds": 7,
                    "remaining_seconds": 593
                },
                "elapsed_seconds": 7,
                "date": "2023-05-15T20:00:59"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 95,
                "y": 9
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 8,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:49",
                    "elapsed_seconds": 11,
                    "remaining_seconds": 589
                },
                "elapsed_seconds": 11,
                "date": "2023-05-15T20:01:02"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 10,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:46",
                    "elapsed_seconds": 14,
                    "remaining_seconds": 586
                },
                "elapsed_seconds": 14,
                "date": "2023-05-15T20:01:10"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 87,
                "y": 44
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 11,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:46",
                    "elapsed_seconds": 14,
                    "remaining_seconds": 586
                },
                "elapsed_seconds": 14,
                "date": "2023-05-15T20:01:10"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 14,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 20,
                "date": "2023-05-15T20:01:31"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 89,
                "y": 63
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 15,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 20,
                "date": "2023-05-15T20:01:31"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 16,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 20,
                "date": "2023-05-15T20:01:55"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 17,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 20,
                "date": "2023-05-15T20:01:55"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 18,
            "code": "LLE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 20,
                "date": "2023-05-15T20:02:15"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 19,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 20,
                "date": "2023-05-15T20:02:16"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 23,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:24",
                    "elapsed_seconds": 36,
                    "remaining_seconds": 564
                },
                "elapsed_seconds": 36,
                "date": "2023-05-15T20:02:35"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 31,
                "y": 38
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 24,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:21",
                    "elapsed_seconds": 39,
                    "remaining_seconds": 561
                },
                "elapsed_seconds": 39,
                "date": "2023-05-15T20:02:38"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 25,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:18",
                    "elapsed_seconds": 42,
                    "remaining_seconds": 558
                },
                "elapsed_seconds": 42,
                "date": "2023-05-15T20:02:41"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 68,
                "y": 40
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 26,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:09:18",
                    "elapsed_seconds": 42,
                    "remaining_seconds": 558
                },
                "elapsed_seconds": 42,
                "date": "2023-05-15T20:02:41"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 27,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:51",
                    "elapsed_seconds": 69,
                    "remaining_seconds": 531
                },
                "elapsed_seconds": 69,
                "date": "2023-05-15T20:03:09"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 23,
                "y": 88
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 28,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:48",
                    "elapsed_seconds": 72,
                    "remaining_seconds": 528
                },
                "elapsed_seconds": 72,
                "date": "2023-05-15T20:03:11"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 29,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:39",
                    "elapsed_seconds": 81,
                    "remaining_seconds": 519
                },
                "elapsed_seconds": 81,
                "date": "2023-05-15T20:03:21"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 96,
                "y": 39
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 30,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:39",
                    "elapsed_seconds": 81,
                    "remaining_seconds": 519
                },
                "elapsed_seconds": 81,
                "date": "2023-05-15T20:03:21"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 31,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:22",
                    "elapsed_seconds": 98,
                    "remaining_seconds": 502
                },
                "elapsed_seconds": 98,
                "date": "2023-05-15T20:03:38"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 32,
                "y": 43
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 32,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:18",
                    "elapsed_seconds": 102,
                    "remaining_seconds": 498
                },
                "elapsed_seconds": 102,
                "date": "2023-05-15T20:03:41"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 33,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:05",
                    "elapsed_seconds": 115,
                    "remaining_seconds": 485
                },
                "elapsed_seconds": 115,
                "date": "2023-05-15T20:03:55"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 83,
                "y": 7
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 34,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:01",
                    "elapsed_seconds": 119,
                    "remaining_seconds": 481
                },
                "elapsed_seconds": 119,
                "date": "2023-05-15T20:03:58"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 35,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:00",
                    "elapsed_seconds": 120,
                    "remaining_seconds": 480
                },
                "elapsed_seconds": 120,
                "date": "2023-05-15T20:03:59"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 82,
                "y": 27
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 36,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:08:00",
                    "elapsed_seconds": 120,
                    "remaining_seconds": 480
                },
                "elapsed_seconds": 120,
                "date": "2023-05-15T20:03:59"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 37,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:53",
                    "elapsed_seconds": 127,
                    "remaining_seconds": 473
                },
                "elapsed_seconds": 127,
                "date": "2023-05-15T20:04:06"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 29,
                "y": 73
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 38,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:50",
                    "elapsed_seconds": 130,
                    "remaining_seconds": 470
                },
                "elapsed_seconds": 130,
                "date": "2023-05-15T20:04:09"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 39,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:33",
                    "elapsed_seconds": 147,
                    "remaining_seconds": 453
                },
                "elapsed_seconds": 147,
                "date": "2023-05-15T20:04:27"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 67,
                "y": 50
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 40,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:30",
                    "elapsed_seconds": 150,
                    "remaining_seconds": 450
                },
                "elapsed_seconds": 150,
                "date": "2023-05-15T20:04:30"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 41,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:23",
                    "elapsed_seconds": 157,
                    "remaining_seconds": 443
                },
                "elapsed_seconds": 157,
                "date": "2023-05-15T20:04:37"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 25,
                "y": 84
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 42,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:20",
                    "elapsed_seconds": 160,
                    "remaining_seconds": 440
                },
                "elapsed_seconds": 160,
                "date": "2023-05-15T20:04:39"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 47,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:03",
                    "elapsed_seconds": 177,
                    "remaining_seconds": 423
                },
                "elapsed_seconds": 177,
                "date": "2023-05-15T20:05:05"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 65,
                "y": 80
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 48,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:07:03",
                    "elapsed_seconds": 177,
                    "remaining_seconds": 423
                },
                "elapsed_seconds": 177,
                "date": "2023-05-15T20:05:05"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 49,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:06:49",
                    "elapsed_seconds": 191,
                    "remaining_seconds": 409
                },
                "elapsed_seconds": 191,
                "date": "2023-05-15T20:05:19"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 7,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 51,
            "code": "FAO",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:06:38",
                    "elapsed_seconds": 202,
                    "remaining_seconds": 398
                },
                "elapsed_seconds": 202,
                "date": "2023-05-15T20:05:32"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 7,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 53,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:06:38",
                    "elapsed_seconds": 202,
                    "remaining_seconds": 398
                },
                "elapsed_seconds": 202,
                "date": "2023-05-15T20:05:32"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 55,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:06:20",
                    "elapsed_seconds": 220,
                    "remaining_seconds": 380
                },
                "elapsed_seconds": 220,
                "date": "2023-05-15T20:06:07"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 23,
                "y": 12
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 56,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:06:20",
                    "elapsed_seconds": 220,
                    "remaining_seconds": 380
                },
                "elapsed_seconds": 220,
                "date": "2023-05-15T20:06:07"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 57,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:06:07",
                    "elapsed_seconds": 233,
                    "remaining_seconds": 367
                },
                "elapsed_seconds": 233,
                "date": "2023-05-15T20:06:19"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 90,
                "y": 51
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 58,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:06:07",
                    "elapsed_seconds": 233,
                    "remaining_seconds": 367
                },
                "elapsed_seconds": 233,
                "date": "2023-05-15T20:06:19"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 59,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:58",
                    "elapsed_seconds": 242,
                    "remaining_seconds": 358
                },
                "elapsed_seconds": 242,
                "date": "2023-05-15T20:06:28"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 4,
                "y": 57
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 60,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:54",
                    "elapsed_seconds": 246,
                    "remaining_seconds": 354
                },
                "elapsed_seconds": 246,
                "date": "2023-05-15T20:06:31"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 61,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:53",
                    "elapsed_seconds": 247,
                    "remaining_seconds": 353
                },
                "elapsed_seconds": 247,
                "date": "2023-05-15T20:06:33"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 95,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 62,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:53",
                    "elapsed_seconds": 247,
                    "remaining_seconds": 353
                },
                "elapsed_seconds": 247,
                "date": "2023-05-15T20:06:33"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 64,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:37",
                    "elapsed_seconds": 263,
                    "remaining_seconds": 337
                },
                "elapsed_seconds": 263,
                "date": "2023-05-15T20:06:49"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 32,
                "y": 52
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 65,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:37",
                    "elapsed_seconds": 263,
                    "remaining_seconds": 337
                },
                "elapsed_seconds": 263,
                "date": "2023-05-15T20:06:51"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 69,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:12",
                    "elapsed_seconds": 288,
                    "remaining_seconds": 312
                },
                "elapsed_seconds": 288,
                "date": "2023-05-15T20:07:50"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 93,
                "y": 58
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 70,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:06",
                    "elapsed_seconds": 294,
                    "remaining_seconds": 306
                },
                "elapsed_seconds": 294,
                "date": "2023-05-15T20:07:55"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 71,
            "code": "ENT",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:05:06",
                    "elapsed_seconds": 294,
                    "remaining_seconds": 306
                },
                "elapsed_seconds": 294,
                "date": "2023-05-15T20:07:55"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 94,
                "y": 50
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 72,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:53",
                    "elapsed_seconds": 307,
                    "remaining_seconds": 293
                },
                "elapsed_seconds": 307,
                "date": "2023-05-15T20:08:07"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 7,
                "y": 42
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 74,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:53",
                    "elapsed_seconds": 307,
                    "remaining_seconds": 293
                },
                "elapsed_seconds": 307,
                "date": "2023-05-15T20:08:07"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 76,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:29",
                    "elapsed_seconds": 331,
                    "remaining_seconds": 269
                },
                "elapsed_seconds": 331,
                "date": "2023-05-15T20:08:41"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 79,
                "y": 90
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 77,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:26",
                    "elapsed_seconds": 334,
                    "remaining_seconds": 266
                },
                "elapsed_seconds": 334,
                "date": "2023-05-15T20:08:44"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 79,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:17",
                    "elapsed_seconds": 343,
                    "remaining_seconds": 257
                },
                "elapsed_seconds": 343,
                "date": "2023-05-15T20:08:56"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 11,
                "y": 44
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 80,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:17",
                    "elapsed_seconds": 343,
                    "remaining_seconds": 257
                },
                "elapsed_seconds": 343,
                "date": "2023-05-15T20:08:56"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 81,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:17",
                    "elapsed_seconds": 343,
                    "remaining_seconds": 257
                },
                "elapsed_seconds": 343,
                "date": "2023-05-15T20:09:35"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 82,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:17",
                    "elapsed_seconds": 343,
                    "remaining_seconds": 257
                },
                "elapsed_seconds": 343,
                "date": "2023-05-15T20:09:58"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 84,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:06",
                    "elapsed_seconds": 354,
                    "remaining_seconds": 246
                },
                "elapsed_seconds": 354,
                "date": "2023-05-15T20:10:12"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 85,
                "y": 97
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 85,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:04:06",
                    "elapsed_seconds": 354,
                    "remaining_seconds": 246
                },
                "elapsed_seconds": 354,
                "date": "2023-05-15T20:10:12"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 86,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:57",
                    "elapsed_seconds": 363,
                    "remaining_seconds": 237
                },
                "elapsed_seconds": 363,
                "date": "2023-05-15T20:10:21"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 12,
                "y": 51
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 87,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:43",
                    "elapsed_seconds": 377,
                    "remaining_seconds": 223
                },
                "elapsed_seconds": 377,
                "date": "2023-05-15T20:10:35"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 87,
                "y": 47
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 88,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:43",
                    "elapsed_seconds": 377,
                    "remaining_seconds": 223
                },
                "elapsed_seconds": 377,
                "date": "2023-05-15T20:10:35"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 89,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:38",
                    "elapsed_seconds": 382,
                    "remaining_seconds": 218
                },
                "elapsed_seconds": 382,
                "date": "2023-05-15T20:10:40"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 9,
                "y": 45
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 90,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:38",
                    "elapsed_seconds": 382,
                    "remaining_seconds": 218
                },
                "elapsed_seconds": 382,
                "date": "2023-05-15T20:10:40"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 92,
            "code": "FAO",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:10:55"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 9,
                "y": 45
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 94,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:10:55"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 95,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:11:19"
            },
            "player": {
                "id": 12738,
                "name": "Tulio Henrique da Silva",
                "nickname": "Túlio da Silva",
                "number": 7
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 96,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:11:19"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 97,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:11:19"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 98,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:11:19"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 99,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:11:19"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 100,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:25",
                    "elapsed_seconds": 395,
                    "remaining_seconds": 205
                },
                "elapsed_seconds": 395,
                "date": "2023-05-15T20:11:19"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 102,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:12",
                    "elapsed_seconds": 408,
                    "remaining_seconds": 192
                },
                "elapsed_seconds": 408,
                "date": "2023-05-15T20:11:43"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 4,
                "y": 97
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 103,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:03:12",
                    "elapsed_seconds": 408,
                    "remaining_seconds": 192
                },
                "elapsed_seconds": 408,
                "date": "2023-05-15T20:11:43"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 105,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:52",
                    "elapsed_seconds": 428,
                    "remaining_seconds": 172
                },
                "elapsed_seconds": 428,
                "date": "2023-05-15T20:12:03"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 93,
                "y": 42
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 106,
            "code": "ROE",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:52",
                    "elapsed_seconds": 428,
                    "remaining_seconds": 172
                },
                "elapsed_seconds": 428,
                "date": "2023-05-15T20:12:06"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 108,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:47",
                    "elapsed_seconds": 433,
                    "remaining_seconds": 167
                },
                "elapsed_seconds": 433,
                "date": "2023-05-15T20:12:21"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 81,
                "y": 43
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 109,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:43",
                    "elapsed_seconds": 437,
                    "remaining_seconds": 163
                },
                "elapsed_seconds": 437,
                "date": "2023-05-15T20:12:25"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 110,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:34",
                    "elapsed_seconds": 446,
                    "remaining_seconds": 154
                },
                "elapsed_seconds": 446,
                "date": "2023-05-15T20:12:35"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 31,
                "y": 31
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 111,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:31",
                    "elapsed_seconds": 449,
                    "remaining_seconds": 151
                },
                "elapsed_seconds": 449,
                "date": "2023-05-15T20:12:36"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 112,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:10",
                    "elapsed_seconds": 470,
                    "remaining_seconds": 130
                },
                "elapsed_seconds": 470,
                "date": "2023-05-15T20:12:59"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 79,
                "y": 10
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 113,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 473,
                "date": "2023-05-15T20:13:01"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 114,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:01:50",
                    "elapsed_seconds": 490,
                    "remaining_seconds": 110
                },
                "elapsed_seconds": 490,
                "date": "2023-05-15T20:13:19"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 26,
                "y": 19
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 116,
            "code": "TET",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:01:48",
                    "elapsed_seconds": 492,
                    "remaining_seconds": 108
                },
                "elapsed_seconds": 492,
                "date": "2023-05-15T20:13:26"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 118,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:01:24",
                    "elapsed_seconds": 516,
                    "remaining_seconds": 84
                },
                "elapsed_seconds": 516,
                "date": "2023-05-15T20:15:53"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 91,
                "y": 98
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 119,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:01:20",
                    "elapsed_seconds": 520,
                    "remaining_seconds": 80
                },
                "elapsed_seconds": 520,
                "date": "2023-05-15T20:15:56"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 121,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:01:15",
                    "elapsed_seconds": 525,
                    "remaining_seconds": 75
                },
                "elapsed_seconds": 525,
                "date": "2023-05-15T20:16:03"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 91,
                "y": 45
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 123,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:01:02",
                    "elapsed_seconds": 538,
                    "remaining_seconds": 62
                },
                "elapsed_seconds": 538,
                "date": "2023-05-15T20:16:49"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 33,
                "y": 69
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 124,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:58",
                    "elapsed_seconds": 542,
                    "remaining_seconds": 58
                },
                "elapsed_seconds": 542,
                "date": "2023-05-15T20:16:51"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 125,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:45",
                    "elapsed_seconds": 555,
                    "remaining_seconds": 45
                },
                "elapsed_seconds": 555,
                "date": "2023-05-15T20:17:06"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 78,
                "y": 91
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 126,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:41",
                    "elapsed_seconds": 559,
                    "remaining_seconds": 41
                },
                "elapsed_seconds": 559,
                "date": "2023-05-15T20:17:09"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 127,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:41",
                    "elapsed_seconds": 559,
                    "remaining_seconds": 41
                },
                "elapsed_seconds": 559,
                "date": "2023-05-15T20:17:09"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 94,
                "y": 50
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 128,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:24",
                    "elapsed_seconds": 576,
                    "remaining_seconds": 24
                },
                "elapsed_seconds": 576,
                "date": "2023-05-15T20:17:26"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 33,
                "y": 49
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 129,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:21",
                    "elapsed_seconds": 579,
                    "remaining_seconds": 21
                },
                "elapsed_seconds": 579,
                "date": "2023-05-15T20:17:29"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 130,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:03",
                    "elapsed_seconds": 597,
                    "remaining_seconds": 3
                },
                "elapsed_seconds": 597,
                "date": "2023-05-15T20:17:48"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 69,
                "y": 22
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 132,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:03",
                    "elapsed_seconds": 597,
                    "remaining_seconds": 3
                },
                "elapsed_seconds": 597,
                "date": "2023-05-15T20:17:48"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 133,
            "code": "FIQ",
            "time": {
                "quarter": {
                    "id": 1,
                    "clock": "00:00:00",
                    "elapsed_seconds": 600,
                    "remaining_seconds": 0
                },
                "elapsed_seconds": 600,
                "date": "2023-05-15T20:17:52"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 134,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 600,
                "date": "2023-05-15T20:19:33"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 135,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 600,
                "date": "2023-05-15T20:19:33"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 136,
            "code": "IQU",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 600,
                "date": "2023-05-15T20:20:16"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 138,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:48",
                    "elapsed_seconds": 12,
                    "remaining_seconds": 588
                },
                "elapsed_seconds": 612,
                "date": "2023-05-15T20:20:29"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 32,
                "y": 61
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 139,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:45",
                    "elapsed_seconds": 15,
                    "remaining_seconds": 585
                },
                "elapsed_seconds": 615,
                "date": "2023-05-15T20:20:32"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 140,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:30",
                    "elapsed_seconds": 30,
                    "remaining_seconds": 570
                },
                "elapsed_seconds": 630,
                "date": "2023-05-15T20:20:47"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 67,
                "y": 57
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 141,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:26",
                    "elapsed_seconds": 34,
                    "remaining_seconds": 566
                },
                "elapsed_seconds": 634,
                "date": "2023-05-15T20:20:50"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 142,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:23",
                    "elapsed_seconds": 37,
                    "remaining_seconds": 563
                },
                "elapsed_seconds": 637,
                "date": "2023-05-15T20:20:54"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 81,
                "y": 93
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 143,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:20",
                    "elapsed_seconds": 40,
                    "remaining_seconds": 560
                },
                "elapsed_seconds": 640,
                "date": "2023-05-15T20:20:57"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 144,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:07",
                    "elapsed_seconds": 53,
                    "remaining_seconds": 547
                },
                "elapsed_seconds": 653,
                "date": "2023-05-15T20:21:10"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 80,
                "y": 74
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 145,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:04",
                    "elapsed_seconds": 56,
                    "remaining_seconds": 544
                },
                "elapsed_seconds": 656,
                "date": "2023-05-15T20:21:12"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 147,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:00",
                    "elapsed_seconds": 60,
                    "remaining_seconds": 540
                },
                "elapsed_seconds": 660,
                "date": "2023-05-15T20:21:19"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 17,
                "y": 24
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 148,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:00",
                    "elapsed_seconds": 60,
                    "remaining_seconds": 540
                },
                "elapsed_seconds": 660,
                "date": "2023-05-15T20:21:19"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 149,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:00",
                    "elapsed_seconds": 60,
                    "remaining_seconds": 540
                },
                "elapsed_seconds": 660,
                "date": "2023-05-15T20:21:35"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 150,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:09:00",
                    "elapsed_seconds": 60,
                    "remaining_seconds": 540
                },
                "elapsed_seconds": 660,
                "date": "2023-05-15T20:21:35"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 152,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:49",
                    "elapsed_seconds": 71,
                    "remaining_seconds": 529
                },
                "elapsed_seconds": 671,
                "date": "2023-05-15T20:21:55"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 41,
                "y": 30
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 153,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:49",
                    "elapsed_seconds": 71,
                    "remaining_seconds": 529
                },
                "elapsed_seconds": 671,
                "date": "2023-05-15T20:21:55"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 154,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:45",
                    "elapsed_seconds": 75,
                    "remaining_seconds": 525
                },
                "elapsed_seconds": 675,
                "date": "2023-05-15T20:22:00"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 38,
                "y": 48
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 155,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:45",
                    "elapsed_seconds": 75,
                    "remaining_seconds": 525
                },
                "elapsed_seconds": 675,
                "date": "2023-05-15T20:22:00"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 156,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:37",
                    "elapsed_seconds": 83,
                    "remaining_seconds": 517
                },
                "elapsed_seconds": 683,
                "date": "2023-05-15T20:22:07"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 27,
                "y": 22
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 157,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:34",
                    "elapsed_seconds": 86,
                    "remaining_seconds": 514
                },
                "elapsed_seconds": 686,
                "date": "2023-05-15T20:22:10"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 159,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:20",
                    "elapsed_seconds": 100,
                    "remaining_seconds": 500
                },
                "elapsed_seconds": 700,
                "date": "2023-05-15T20:22:27"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 97,
                "y": 82
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 160,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:20",
                    "elapsed_seconds": 100,
                    "remaining_seconds": 500
                },
                "elapsed_seconds": 700,
                "date": "2023-05-15T20:22:27"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 163,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:03",
                    "elapsed_seconds": 117,
                    "remaining_seconds": 483
                },
                "elapsed_seconds": 717,
                "date": "2023-05-15T20:23:03"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 67,
                "y": 39
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 164,
            "code": "ROE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:08:03",
                    "elapsed_seconds": 117,
                    "remaining_seconds": 483
                },
                "elapsed_seconds": 717,
                "date": "2023-05-15T20:23:06"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 166,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:54",
                    "elapsed_seconds": 126,
                    "remaining_seconds": 474
                },
                "elapsed_seconds": 726,
                "date": "2023-05-15T20:23:23"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 91,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 167,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:49",
                    "elapsed_seconds": 131,
                    "remaining_seconds": 469
                },
                "elapsed_seconds": 731,
                "date": "2023-05-15T20:23:27"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 169,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:42",
                    "elapsed_seconds": 138,
                    "remaining_seconds": 462
                },
                "elapsed_seconds": 738,
                "date": "2023-05-15T20:23:38"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 6,
                "y": 77
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 170,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:42",
                    "elapsed_seconds": 138,
                    "remaining_seconds": 462
                },
                "elapsed_seconds": 738,
                "date": "2023-05-15T20:23:40"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 173,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:26",
                    "elapsed_seconds": 154,
                    "remaining_seconds": 446
                },
                "elapsed_seconds": 754,
                "date": "2023-05-15T20:24:28"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 94,
                "y": 63
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 174,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:26",
                    "elapsed_seconds": 154,
                    "remaining_seconds": 446
                },
                "elapsed_seconds": 754,
                "date": "2023-05-15T20:24:28"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 175,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:26",
                    "elapsed_seconds": 154,
                    "remaining_seconds": 446
                },
                "elapsed_seconds": 754,
                "date": "2023-05-15T20:24:51"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 176,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:26",
                    "elapsed_seconds": 154,
                    "remaining_seconds": 446
                },
                "elapsed_seconds": 754,
                "date": "2023-05-15T20:24:51"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 177,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:26",
                    "elapsed_seconds": 154,
                    "remaining_seconds": 446
                },
                "elapsed_seconds": 754,
                "date": "2023-05-15T20:25:03"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 178,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:26",
                    "elapsed_seconds": 154,
                    "remaining_seconds": 446
                },
                "elapsed_seconds": 754,
                "date": "2023-05-15T20:25:16"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 180,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:10",
                    "elapsed_seconds": 170,
                    "remaining_seconds": 430
                },
                "elapsed_seconds": 770,
                "date": "2023-05-15T20:25:35"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 22,
                "y": 11
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 181,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:06",
                    "elapsed_seconds": 174,
                    "remaining_seconds": 426
                },
                "elapsed_seconds": 774,
                "date": "2023-05-15T20:25:39"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 182,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:05",
                    "elapsed_seconds": 175,
                    "remaining_seconds": 425
                },
                "elapsed_seconds": 775,
                "date": "2023-05-15T20:25:41"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 31,
                "y": 72
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 183,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:07:05",
                    "elapsed_seconds": 175,
                    "remaining_seconds": 425
                },
                "elapsed_seconds": 775,
                "date": "2023-05-15T20:25:41"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 185,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:47",
                    "elapsed_seconds": 193,
                    "remaining_seconds": 407
                },
                "elapsed_seconds": 793,
                "date": "2023-05-15T20:25:59"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 68,
                "y": 69
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 186,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:47",
                    "elapsed_seconds": 193,
                    "remaining_seconds": 407
                },
                "elapsed_seconds": 793,
                "date": "2023-05-15T20:26:01"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 187,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:47",
                    "elapsed_seconds": 193,
                    "remaining_seconds": 407
                },
                "elapsed_seconds": 793,
                "date": "2023-05-15T20:26:09"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 188,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:47",
                    "elapsed_seconds": 193,
                    "remaining_seconds": 407
                },
                "elapsed_seconds": 793,
                "date": "2023-05-15T20:26:09"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 189,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:47",
                    "elapsed_seconds": 193,
                    "remaining_seconds": 407
                },
                "elapsed_seconds": 793,
                "date": "2023-05-15T20:26:09"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 190,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:47",
                    "elapsed_seconds": 193,
                    "remaining_seconds": 407
                },
                "elapsed_seconds": 793,
                "date": "2023-05-15T20:26:09"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 193,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:32",
                    "elapsed_seconds": 208,
                    "remaining_seconds": 392
                },
                "elapsed_seconds": 808,
                "date": "2023-05-15T20:26:29"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 23,
                "y": 68
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 194,
            "code": "ROE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:32",
                    "elapsed_seconds": 208,
                    "remaining_seconds": 392
                },
                "elapsed_seconds": 808,
                "date": "2023-05-15T20:26:32"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 196,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:25",
                    "elapsed_seconds": 215,
                    "remaining_seconds": 385
                },
                "elapsed_seconds": 815,
                "date": "2023-05-15T20:26:48"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 7,
                "y": 59
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 197,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:22",
                    "elapsed_seconds": 218,
                    "remaining_seconds": 382
                },
                "elapsed_seconds": 818,
                "date": "2023-05-15T20:26:51"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 198,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:06:01",
                    "elapsed_seconds": 239,
                    "remaining_seconds": 361
                },
                "elapsed_seconds": 839,
                "date": "2023-05-15T20:27:12"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 76,
                "y": 90
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 199,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:58",
                    "elapsed_seconds": 242,
                    "remaining_seconds": 358
                },
                "elapsed_seconds": 842,
                "date": "2023-05-15T20:27:14"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 200,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:42",
                    "elapsed_seconds": 258,
                    "remaining_seconds": 342
                },
                "elapsed_seconds": 858,
                "date": "2023-05-15T20:27:31"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 5,
                "y": 11
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 202,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:42",
                    "elapsed_seconds": 258,
                    "remaining_seconds": 342
                },
                "elapsed_seconds": 858,
                "date": "2023-05-15T20:27:31"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 204,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:38",
                    "elapsed_seconds": 262,
                    "remaining_seconds": 338
                },
                "elapsed_seconds": 862,
                "date": "2023-05-15T20:27:44"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 75,
                "y": 21
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 205,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:35",
                    "elapsed_seconds": 265,
                    "remaining_seconds": 335
                },
                "elapsed_seconds": 865,
                "date": "2023-05-15T20:27:46"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 207,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:35",
                    "elapsed_seconds": 265,
                    "remaining_seconds": 335
                },
                "elapsed_seconds": 865,
                "date": "2023-05-15T20:27:54"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 208,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:35",
                    "elapsed_seconds": 265,
                    "remaining_seconds": 335
                },
                "elapsed_seconds": 865,
                "date": "2023-05-15T20:27:54"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 209,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:35",
                    "elapsed_seconds": 265,
                    "remaining_seconds": 335
                },
                "elapsed_seconds": 865,
                "date": "2023-05-15T20:27:54"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 210,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:35",
                    "elapsed_seconds": 265,
                    "remaining_seconds": 335
                },
                "elapsed_seconds": 865,
                "date": "2023-05-15T20:27:54"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 213,
            "code": "FAO",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:26",
                    "elapsed_seconds": 274,
                    "remaining_seconds": 326
                },
                "elapsed_seconds": 874,
                "date": "2023-05-15T20:28:26"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 20,
                "y": 96
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 215,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:26",
                    "elapsed_seconds": 274,
                    "remaining_seconds": 326
                },
                "elapsed_seconds": 874,
                "date": "2023-05-15T20:28:26"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 217,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:05",
                    "elapsed_seconds": 295,
                    "remaining_seconds": 305
                },
                "elapsed_seconds": 895,
                "date": "2023-05-15T20:29:04"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 78,
                "y": 10
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 218,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:05:05",
                    "elapsed_seconds": 295,
                    "remaining_seconds": 305
                },
                "elapsed_seconds": 895,
                "date": "2023-05-15T20:29:04"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 219,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:04:45",
                    "elapsed_seconds": 315,
                    "remaining_seconds": 285
                },
                "elapsed_seconds": 915,
                "date": "2023-05-15T20:29:24"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 17,
                "y": 79
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 220,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:04:45",
                    "elapsed_seconds": 315,
                    "remaining_seconds": 285
                },
                "elapsed_seconds": 915,
                "date": "2023-05-15T20:29:24"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 221,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:04:31",
                    "elapsed_seconds": 329,
                    "remaining_seconds": 271
                },
                "elapsed_seconds": 929,
                "date": "2023-05-15T20:29:38"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 67,
                "y": 64
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 222,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:04:14",
                    "elapsed_seconds": 346,
                    "remaining_seconds": 254
                },
                "elapsed_seconds": 946,
                "date": "2023-05-15T20:29:55"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 12,
                "y": 50
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 223,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:04:14",
                    "elapsed_seconds": 346,
                    "remaining_seconds": 254
                },
                "elapsed_seconds": 946,
                "date": "2023-05-15T20:29:55"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 224,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:52",
                    "elapsed_seconds": 368,
                    "remaining_seconds": 232
                },
                "elapsed_seconds": 968,
                "date": "2023-05-15T20:30:17"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 85,
                "y": 63
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 225,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:52",
                    "elapsed_seconds": 368,
                    "remaining_seconds": 232
                },
                "elapsed_seconds": 968,
                "date": "2023-05-15T20:30:17"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 226,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:46",
                    "elapsed_seconds": 374,
                    "remaining_seconds": 226
                },
                "elapsed_seconds": 974,
                "date": "2023-05-15T20:30:23"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 20,
                "y": 91
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 227,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:46",
                    "elapsed_seconds": 374,
                    "remaining_seconds": 226
                },
                "elapsed_seconds": 974,
                "date": "2023-05-15T20:30:23"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 231,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:36",
                    "elapsed_seconds": 384,
                    "remaining_seconds": 216
                },
                "elapsed_seconds": 984,
                "date": "2023-05-15T20:30:40"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 232,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:36",
                    "elapsed_seconds": 384,
                    "remaining_seconds": 216
                },
                "elapsed_seconds": 984,
                "date": "2023-05-15T20:30:40"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 235,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:15",
                    "elapsed_seconds": 405,
                    "remaining_seconds": 195
                },
                "elapsed_seconds": 1005,
                "date": "2023-05-15T20:31:21"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 93,
                "y": 13
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 236,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:15",
                    "elapsed_seconds": 405,
                    "remaining_seconds": 195
                },
                "elapsed_seconds": 1005,
                "date": "2023-05-15T20:31:21"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 239,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:04",
                    "elapsed_seconds": 416,
                    "remaining_seconds": 184
                },
                "elapsed_seconds": 1016,
                "date": "2023-05-15T20:31:51"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 69,
                "y": 74
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 240,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:03:04",
                    "elapsed_seconds": 416,
                    "remaining_seconds": 184
                },
                "elapsed_seconds": 1016,
                "date": "2023-05-15T20:31:55"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 244,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:40",
                    "elapsed_seconds": 440,
                    "remaining_seconds": 160
                },
                "elapsed_seconds": 1040,
                "date": "2023-05-15T20:32:35"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 9,
                "y": 97
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 246,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:30",
                    "elapsed_seconds": 450,
                    "remaining_seconds": 150
                },
                "elapsed_seconds": 1050,
                "date": "2023-05-15T20:32:54"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 83,
                "y": 51
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 247,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:30",
                    "elapsed_seconds": 450,
                    "remaining_seconds": 150
                },
                "elapsed_seconds": 1050,
                "date": "2023-05-15T20:32:54"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 248,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:30",
                    "elapsed_seconds": 450,
                    "remaining_seconds": 150
                },
                "elapsed_seconds": 1050,
                "date": "2023-05-15T20:33:15"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 249,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:30",
                    "elapsed_seconds": 450,
                    "remaining_seconds": 150
                },
                "elapsed_seconds": 1050,
                "date": "2023-05-15T20:33:32"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 252,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:33:55"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 15,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 253,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:33:55"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 254,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:33:58"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 15,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 255,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:33:58"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 256,
            "code": "TET",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:34:31"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 257,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:35:53"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 258,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:35:53"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 259,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:35:53"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 260,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:35:53"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 261,
            "code": "LLE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:36:22"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 263,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:02:14",
                    "elapsed_seconds": 466,
                    "remaining_seconds": 134
                },
                "elapsed_seconds": 1066,
                "date": "2023-05-15T20:36:25"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 265,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:36:53"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 93,
                "y": 69
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 266,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:36:53"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 267,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:37:19"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 268,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:37:19"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 269,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:37:34"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 270,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:37:34"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 271,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:37:59"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 272,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:37:59"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 273,
            "code": "LLE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:38:11"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 275,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 1091,
                "date": "2023-05-15T20:38:12"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 276,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:31",
                    "elapsed_seconds": 509,
                    "remaining_seconds": 91
                },
                "elapsed_seconds": 1109,
                "date": "2023-05-15T20:38:31"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 6,
                "y": 23
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 277,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:27",
                    "elapsed_seconds": 513,
                    "remaining_seconds": 87
                },
                "elapsed_seconds": 1113,
                "date": "2023-05-15T20:38:35"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 278,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:10",
                    "elapsed_seconds": 530,
                    "remaining_seconds": 70
                },
                "elapsed_seconds": 1130,
                "date": "2023-05-15T20:38:52"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 85,
                "y": 4
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 279,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:06",
                    "elapsed_seconds": 534,
                    "remaining_seconds": 66
                },
                "elapsed_seconds": 1134,
                "date": "2023-05-15T20:38:55"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 280,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:01:02",
                    "elapsed_seconds": 538,
                    "remaining_seconds": 62
                },
                "elapsed_seconds": 1138,
                "date": "2023-05-15T20:39:00"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 29,
                "y": 23
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 281,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:58",
                    "elapsed_seconds": 542,
                    "remaining_seconds": 58
                },
                "elapsed_seconds": 1142,
                "date": "2023-05-15T20:39:03"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 283,
            "code": "FAO",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:47",
                    "elapsed_seconds": 553,
                    "remaining_seconds": 47
                },
                "elapsed_seconds": 1153,
                "date": "2023-05-15T20:39:18"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 71,
                "y": 14
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 285,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:47",
                    "elapsed_seconds": 553,
                    "remaining_seconds": 47
                },
                "elapsed_seconds": 1153,
                "date": "2023-05-15T20:39:18"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 286,
            "code": "TET",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:47",
                    "elapsed_seconds": 553,
                    "remaining_seconds": 47
                },
                "elapsed_seconds": 1153,
                "date": "2023-05-15T20:39:32"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 287,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:47",
                    "elapsed_seconds": 553,
                    "remaining_seconds": 47
                },
                "elapsed_seconds": 1153,
                "date": "2023-05-15T20:40:58"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 289,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:47",
                    "elapsed_seconds": 553,
                    "remaining_seconds": 47
                },
                "elapsed_seconds": 1153,
                "date": "2023-05-15T20:40:58"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 292,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:31",
                    "elapsed_seconds": 569,
                    "remaining_seconds": 31
                },
                "elapsed_seconds": 1169,
                "date": "2023-05-15T20:41:22"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 30,
                "y": 65
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 293,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:31",
                    "elapsed_seconds": 569,
                    "remaining_seconds": 31
                },
                "elapsed_seconds": 1169,
                "date": "2023-05-15T20:41:22"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 295,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:06",
                    "elapsed_seconds": 594,
                    "remaining_seconds": 6
                },
                "elapsed_seconds": 1194,
                "date": "2023-05-15T20:41:48"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 96,
                "y": 4
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 296,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:06",
                    "elapsed_seconds": 594,
                    "remaining_seconds": 6
                },
                "elapsed_seconds": 1194,
                "date": "2023-05-15T20:41:48"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 302,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:06",
                    "elapsed_seconds": 594,
                    "remaining_seconds": 6
                },
                "elapsed_seconds": 1194,
                "date": "2023-05-15T20:44:20"
            },
            "player": {
                "id": 801,
                "name": "Ralfi Silva Ansaloni",
                "nickname": "Ansaloni",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 303,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:06",
                    "elapsed_seconds": 594,
                    "remaining_seconds": 6
                },
                "elapsed_seconds": 1194,
                "date": "2023-05-15T20:44:20"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 304,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:06",
                    "elapsed_seconds": 594,
                    "remaining_seconds": 6
                },
                "elapsed_seconds": 1194,
                "date": "2023-05-15T20:44:20"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 305,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:06",
                    "elapsed_seconds": 594,
                    "remaining_seconds": 6
                },
                "elapsed_seconds": 1194,
                "date": "2023-05-15T20:44:20"
            },
            "player": {
                "id": 13120,
                "name": "Gustavo Nicolas Aguirre",
                "nickname": "Aguirre",
                "number": 7
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 308,
            "code": "FIQ",
            "time": {
                "quarter": {
                    "id": 2,
                    "clock": "00:00:00",
                    "elapsed_seconds": 600,
                    "remaining_seconds": 0
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T20:44:49"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 309,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 310,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 311,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 312,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 13120,
                "name": "Gustavo Nicolas Aguirre",
                "nickname": "Aguirre",
                "number": 7
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 313,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 314,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 315,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 316,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:00:43"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 317,
            "code": "IQU",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1200,
                "date": "2023-05-15T21:01:05"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 319,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:42",
                    "elapsed_seconds": 18,
                    "remaining_seconds": 582
                },
                "elapsed_seconds": 1218,
                "date": "2023-05-15T21:01:24"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 12,
                "y": 75
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 320,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:42",
                    "elapsed_seconds": 18,
                    "remaining_seconds": 582
                },
                "elapsed_seconds": 1218,
                "date": "2023-05-15T21:01:24"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 321,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:37",
                    "elapsed_seconds": 23,
                    "remaining_seconds": 577
                },
                "elapsed_seconds": 1223,
                "date": "2023-05-15T21:01:29"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 93,
                "y": 44
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 322,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:37",
                    "elapsed_seconds": 23,
                    "remaining_seconds": 577
                },
                "elapsed_seconds": 1223,
                "date": "2023-05-15T21:01:29"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 324,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:20",
                    "elapsed_seconds": 40,
                    "remaining_seconds": 560
                },
                "elapsed_seconds": 1240,
                "date": "2023-05-15T21:01:48"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 7,
                "y": 42
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 325,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:20",
                    "elapsed_seconds": 40,
                    "remaining_seconds": 560
                },
                "elapsed_seconds": 1240,
                "date": "2023-05-15T21:01:48"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 327,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:19",
                    "elapsed_seconds": 41,
                    "remaining_seconds": 559
                },
                "elapsed_seconds": 1241,
                "date": "2023-05-15T21:02:09"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 7,
                "y": 61
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 328,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:15",
                    "elapsed_seconds": 45,
                    "remaining_seconds": 555
                },
                "elapsed_seconds": 1245,
                "date": "2023-05-15T21:02:12"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 329,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:04",
                    "elapsed_seconds": 56,
                    "remaining_seconds": 544
                },
                "elapsed_seconds": 1256,
                "date": "2023-05-15T21:02:24"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 84,
                "y": 52
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 330,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:09:04",
                    "elapsed_seconds": 56,
                    "remaining_seconds": 544
                },
                "elapsed_seconds": 1256,
                "date": "2023-05-15T21:02:24"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 331,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:08:48",
                    "elapsed_seconds": 72,
                    "remaining_seconds": 528
                },
                "elapsed_seconds": 1272,
                "date": "2023-05-15T21:02:40"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 25,
                "y": 86
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 332,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:08:45",
                    "elapsed_seconds": 75,
                    "remaining_seconds": 525
                },
                "elapsed_seconds": 1275,
                "date": "2023-05-15T21:02:43"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 333,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:08:35",
                    "elapsed_seconds": 85,
                    "remaining_seconds": 515
                },
                "elapsed_seconds": 1285,
                "date": "2023-05-15T21:02:53"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 78,
                "y": 92
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 335,
            "code": "TET",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:08:34",
                    "elapsed_seconds": 86,
                    "remaining_seconds": 514
                },
                "elapsed_seconds": 1286,
                "date": "2023-05-15T21:03:01"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 339,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:08:23",
                    "elapsed_seconds": 97,
                    "remaining_seconds": 503
                },
                "elapsed_seconds": 1297,
                "date": "2023-05-15T21:04:43"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 33,
                "y": 42
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 340,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:08:12",
                    "elapsed_seconds": 108,
                    "remaining_seconds": 492
                },
                "elapsed_seconds": 1308,
                "date": "2023-05-15T21:04:54"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 71,
                "y": 25
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 341,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:08:12",
                    "elapsed_seconds": 108,
                    "remaining_seconds": 492
                },
                "elapsed_seconds": 1308,
                "date": "2023-05-15T21:04:54"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 342,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:58",
                    "elapsed_seconds": 122,
                    "remaining_seconds": 478
                },
                "elapsed_seconds": 1322,
                "date": "2023-05-15T21:05:08"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 7,
                "y": 44
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 343,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:36",
                    "elapsed_seconds": 144,
                    "remaining_seconds": 456
                },
                "elapsed_seconds": 1344,
                "date": "2023-05-15T21:05:29"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 77,
                "y": 12
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 349,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:36",
                    "elapsed_seconds": 144,
                    "remaining_seconds": 456
                },
                "elapsed_seconds": 1344,
                "date": "2023-05-15T21:05:29"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 344,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:20",
                    "elapsed_seconds": 160,
                    "remaining_seconds": 440
                },
                "elapsed_seconds": 1360,
                "date": "2023-05-15T21:05:45"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 27,
                "y": 15
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 346,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:20",
                    "elapsed_seconds": 160,
                    "remaining_seconds": 440
                },
                "elapsed_seconds": 1360,
                "date": "2023-05-15T21:05:48"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 347,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:20",
                    "elapsed_seconds": 160,
                    "remaining_seconds": 440
                },
                "elapsed_seconds": 1360,
                "date": "2023-05-15T21:05:49"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 8,
                "y": 26
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 348,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:20",
                    "elapsed_seconds": 160,
                    "remaining_seconds": 440
                },
                "elapsed_seconds": 1360,
                "date": "2023-05-15T21:05:49"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 352,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:14",
                    "elapsed_seconds": 166,
                    "remaining_seconds": 434
                },
                "elapsed_seconds": 1366,
                "date": "2023-05-15T21:06:20"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 10,
                "y": 51
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 354,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:07:00",
                    "elapsed_seconds": 180,
                    "remaining_seconds": 420
                },
                "elapsed_seconds": 1380,
                "date": "2023-05-15T21:07:00"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 69,
                "y": 31
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 355,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:56",
                    "elapsed_seconds": 184,
                    "remaining_seconds": 416
                },
                "elapsed_seconds": 1384,
                "date": "2023-05-15T21:07:03"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 357,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:51",
                    "elapsed_seconds": 189,
                    "remaining_seconds": 411
                },
                "elapsed_seconds": 1389,
                "date": "2023-05-15T21:07:14"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 20,
                "y": 93
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 358,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:51",
                    "elapsed_seconds": 189,
                    "remaining_seconds": 411
                },
                "elapsed_seconds": 1389,
                "date": "2023-05-15T21:07:14"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 361,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:44",
                    "elapsed_seconds": 196,
                    "remaining_seconds": 404
                },
                "elapsed_seconds": 1396,
                "date": "2023-05-15T21:07:32"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 26,
                "y": 81
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 362,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:44",
                    "elapsed_seconds": 196,
                    "remaining_seconds": 404
                },
                "elapsed_seconds": 1396,
                "date": "2023-05-15T21:07:35"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 363,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:44",
                    "elapsed_seconds": 196,
                    "remaining_seconds": 404
                },
                "elapsed_seconds": 1396,
                "date": "2023-05-15T21:07:37"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 12,
                "y": 41
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 364,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:44",
                    "elapsed_seconds": 196,
                    "remaining_seconds": 404
                },
                "elapsed_seconds": 1396,
                "date": "2023-05-15T21:07:37"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 367,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:34",
                    "elapsed_seconds": 206,
                    "remaining_seconds": 394
                },
                "elapsed_seconds": 1406,
                "date": "2023-05-15T21:08:05"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 91,
                "y": 51
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 368,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:34",
                    "elapsed_seconds": 206,
                    "remaining_seconds": 394
                },
                "elapsed_seconds": 1406,
                "date": "2023-05-15T21:08:05"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 372,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:27",
                    "elapsed_seconds": 213,
                    "remaining_seconds": 387
                },
                "elapsed_seconds": 1413,
                "date": "2023-05-15T21:08:34"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 92,
                "y": 97
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 373,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:24",
                    "elapsed_seconds": 216,
                    "remaining_seconds": 384
                },
                "elapsed_seconds": 1416,
                "date": "2023-05-15T21:08:37"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 375,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:21",
                    "elapsed_seconds": 219,
                    "remaining_seconds": 381
                },
                "elapsed_seconds": 1419,
                "date": "2023-05-15T21:08:43"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 20,
                "y": 92
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 376,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:21",
                    "elapsed_seconds": 219,
                    "remaining_seconds": 381
                },
                "elapsed_seconds": 1419,
                "date": "2023-05-15T21:08:46"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 377,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:21",
                    "elapsed_seconds": 219,
                    "remaining_seconds": 381
                },
                "elapsed_seconds": 1419,
                "date": "2023-05-15T21:08:47"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 11,
                "y": 61
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 378,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:21",
                    "elapsed_seconds": 219,
                    "remaining_seconds": 381
                },
                "elapsed_seconds": 1419,
                "date": "2023-05-15T21:08:47"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 379,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:21",
                    "elapsed_seconds": 219,
                    "remaining_seconds": 381
                },
                "elapsed_seconds": 1419,
                "date": "2023-05-15T21:09:46"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 380,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:21",
                    "elapsed_seconds": 219,
                    "remaining_seconds": 381
                },
                "elapsed_seconds": 1419,
                "date": "2023-05-15T21:09:46"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 384,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:02",
                    "elapsed_seconds": 238,
                    "remaining_seconds": 362
                },
                "elapsed_seconds": 1438,
                "date": "2023-05-15T21:10:09"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 73,
                "y": 15
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 385,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:06:02",
                    "elapsed_seconds": 238,
                    "remaining_seconds": 362
                },
                "elapsed_seconds": 1438,
                "date": "2023-05-15T21:10:09"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 389,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:40",
                    "elapsed_seconds": 260,
                    "remaining_seconds": 340
                },
                "elapsed_seconds": 1460,
                "date": "2023-05-15T21:10:37"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 9,
                "y": 68
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 390,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:40",
                    "elapsed_seconds": 260,
                    "remaining_seconds": 340
                },
                "elapsed_seconds": 1460,
                "date": "2023-05-15T21:10:37"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 392,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:37",
                    "elapsed_seconds": 263,
                    "remaining_seconds": 337
                },
                "elapsed_seconds": 1463,
                "date": "2023-05-15T21:10:59"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 1,
                "y": 74
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 393,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:37",
                    "elapsed_seconds": 263,
                    "remaining_seconds": 337
                },
                "elapsed_seconds": 1463,
                "date": "2023-05-15T21:10:59"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 394,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:14",
                    "elapsed_seconds": 286,
                    "remaining_seconds": 314
                },
                "elapsed_seconds": 1486,
                "date": "2023-05-15T21:11:21"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 92,
                "y": 37
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 396,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:11",
                    "elapsed_seconds": 289,
                    "remaining_seconds": 311
                },
                "elapsed_seconds": 1489,
                "date": "2023-05-15T21:11:25"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 397,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:11",
                    "elapsed_seconds": 289,
                    "remaining_seconds": 311
                },
                "elapsed_seconds": 1489,
                "date": "2023-05-15T21:11:30"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 33,
                "y": 22
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 398,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:11",
                    "elapsed_seconds": 289,
                    "remaining_seconds": 311
                },
                "elapsed_seconds": 1489,
                "date": "2023-05-15T21:11:30"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 399,
            "code": "LLE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:11",
                    "elapsed_seconds": 289,
                    "remaining_seconds": 311
                },
                "elapsed_seconds": 1489,
                "date": "2023-05-15T21:12:00"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 400,
            "code": "LLE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:11",
                    "elapsed_seconds": 289,
                    "remaining_seconds": 311
                },
                "elapsed_seconds": 1489,
                "date": "2023-05-15T21:12:21"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 402,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:11",
                    "elapsed_seconds": 289,
                    "remaining_seconds": 311
                },
                "elapsed_seconds": 1489,
                "date": "2023-05-15T21:12:23"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 403,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:04",
                    "elapsed_seconds": 296,
                    "remaining_seconds": 304
                },
                "elapsed_seconds": 1496,
                "date": "2023-05-15T21:12:30"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 9,
                "y": 41
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 404,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:05:01",
                    "elapsed_seconds": 299,
                    "remaining_seconds": 301
                },
                "elapsed_seconds": 1499,
                "date": "2023-05-15T21:12:33"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 405,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:47",
                    "elapsed_seconds": 313,
                    "remaining_seconds": 287
                },
                "elapsed_seconds": 1513,
                "date": "2023-05-15T21:12:47"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 73,
                "y": 85
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 406,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:47",
                    "elapsed_seconds": 313,
                    "remaining_seconds": 287
                },
                "elapsed_seconds": 1513,
                "date": "2023-05-15T21:12:47"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 407,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:21",
                    "elapsed_seconds": 339,
                    "remaining_seconds": 261
                },
                "elapsed_seconds": 1539,
                "date": "2023-05-15T21:13:13"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 31,
                "y": 74
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 408,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:18",
                    "elapsed_seconds": 342,
                    "remaining_seconds": 258
                },
                "elapsed_seconds": 1542,
                "date": "2023-05-15T21:13:16"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 410,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:16",
                    "elapsed_seconds": 344,
                    "remaining_seconds": 256
                },
                "elapsed_seconds": 1544,
                "date": "2023-05-15T21:13:20"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 7,
                "y": 5
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 411,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:16",
                    "elapsed_seconds": 344,
                    "remaining_seconds": 256
                },
                "elapsed_seconds": 1544,
                "date": "2023-05-15T21:13:23"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 412,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:16",
                    "elapsed_seconds": 344,
                    "remaining_seconds": 256
                },
                "elapsed_seconds": 1544,
                "date": "2023-05-15T21:13:31"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 413,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:16",
                    "elapsed_seconds": 344,
                    "remaining_seconds": 256
                },
                "elapsed_seconds": 1544,
                "date": "2023-05-15T21:13:31"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 414,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:16",
                    "elapsed_seconds": 344,
                    "remaining_seconds": 256
                },
                "elapsed_seconds": 1544,
                "date": "2023-05-15T21:13:31"
            },
            "player": {
                "id": 11657,
                "name": "Rafael Hettsheimeir",
                "nickname": "Hettsheimeir",
                "number": 30
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 415,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:04:16",
                    "elapsed_seconds": 344,
                    "remaining_seconds": 256
                },
                "elapsed_seconds": 1544,
                "date": "2023-05-15T21:13:31"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 418,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:54",
                    "elapsed_seconds": 366,
                    "remaining_seconds": 234
                },
                "elapsed_seconds": 1566,
                "date": "2023-05-15T21:14:04"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 68,
                "y": 69
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 419,
            "code": "TET",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:54",
                    "elapsed_seconds": 366,
                    "remaining_seconds": 234
                },
                "elapsed_seconds": 1566,
                "date": "2023-05-15T21:14:28"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 421,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:27",
                    "elapsed_seconds": 393,
                    "remaining_seconds": 207
                },
                "elapsed_seconds": 1593,
                "date": "2023-05-15T21:16:18"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 12,
                "y": 98
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 422,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:23",
                    "elapsed_seconds": 397,
                    "remaining_seconds": 203
                },
                "elapsed_seconds": 1597,
                "date": "2023-05-15T21:16:22"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 423,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:22",
                    "elapsed_seconds": 398,
                    "remaining_seconds": 202
                },
                "elapsed_seconds": 1598,
                "date": "2023-05-15T21:16:23"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 96,
                "y": 59
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 424,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:22",
                    "elapsed_seconds": 398,
                    "remaining_seconds": 202
                },
                "elapsed_seconds": 1598,
                "date": "2023-05-15T21:16:23"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 425,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:10",
                    "elapsed_seconds": 410,
                    "remaining_seconds": 190
                },
                "elapsed_seconds": 1610,
                "date": "2023-05-15T21:16:35"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 26,
                "y": 84
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 426,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:07",
                    "elapsed_seconds": 413,
                    "remaining_seconds": 187
                },
                "elapsed_seconds": 1613,
                "date": "2023-05-15T21:16:38"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 427,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:05",
                    "elapsed_seconds": 415,
                    "remaining_seconds": 185
                },
                "elapsed_seconds": 1615,
                "date": "2023-05-15T21:16:41"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 18,
                "y": 95
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 428,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:03:01",
                    "elapsed_seconds": 419,
                    "remaining_seconds": 181
                },
                "elapsed_seconds": 1619,
                "date": "2023-05-15T21:16:44"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 429,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:47",
                    "elapsed_seconds": 433,
                    "remaining_seconds": 167
                },
                "elapsed_seconds": 1633,
                "date": "2023-05-15T21:16:58"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 4,
                "y": 3
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 430,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:47",
                    "elapsed_seconds": 433,
                    "remaining_seconds": 167
                },
                "elapsed_seconds": 1633,
                "date": "2023-05-15T21:16:58"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 431,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:22",
                    "elapsed_seconds": 458,
                    "remaining_seconds": 142
                },
                "elapsed_seconds": 1658,
                "date": "2023-05-15T21:17:23"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 73,
                "y": 79
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 432,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:18",
                    "elapsed_seconds": 462,
                    "remaining_seconds": 138
                },
                "elapsed_seconds": 1662,
                "date": "2023-05-15T21:17:27"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 434,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:17:40"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 7,
                "y": 54
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 435,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:17:40"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 436,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:18:03"
            },
            "player": {
                "id": 11954,
                "name": "Corderro L. Bennett",
                "nickname": "Bennett",
                "number": 3
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 437,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:18:03"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 438,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:18:03"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 439,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:18:03"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 440,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:18:20"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 441,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:18:20"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 442,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:02:07",
                    "elapsed_seconds": 473,
                    "remaining_seconds": 127
                },
                "elapsed_seconds": 1673,
                "date": "2023-05-15T21:18:49"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 444,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:39",
                    "elapsed_seconds": 501,
                    "remaining_seconds": 99
                },
                "elapsed_seconds": 1701,
                "date": "2023-05-15T21:19:20"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 74,
                "y": 16
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 445,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:36",
                    "elapsed_seconds": 504,
                    "remaining_seconds": 96
                },
                "elapsed_seconds": 1704,
                "date": "2023-05-15T21:19:23"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 446,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:28",
                    "elapsed_seconds": 512,
                    "remaining_seconds": 88
                },
                "elapsed_seconds": 1712,
                "date": "2023-05-15T21:19:31"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 4,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 447,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:25",
                    "elapsed_seconds": 515,
                    "remaining_seconds": 85
                },
                "elapsed_seconds": 1715,
                "date": "2023-05-15T21:19:34"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 448,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:18",
                    "elapsed_seconds": 522,
                    "remaining_seconds": 78
                },
                "elapsed_seconds": 1722,
                "date": "2023-05-15T21:19:41"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 75,
                "y": 91
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 449,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:15",
                    "elapsed_seconds": 525,
                    "remaining_seconds": 75
                },
                "elapsed_seconds": 1725,
                "date": "2023-05-15T21:19:44"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 451,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:08",
                    "elapsed_seconds": 532,
                    "remaining_seconds": 68
                },
                "elapsed_seconds": 1732,
                "date": "2023-05-15T21:19:53"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 69,
                "y": 46
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 452,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:08",
                    "elapsed_seconds": 532,
                    "remaining_seconds": 68
                },
                "elapsed_seconds": 1732,
                "date": "2023-05-15T21:19:53"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 453,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:08",
                    "elapsed_seconds": 532,
                    "remaining_seconds": 68
                },
                "elapsed_seconds": 1732,
                "date": "2023-05-15T21:20:13"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 454,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:01:08",
                    "elapsed_seconds": 532,
                    "remaining_seconds": 68
                },
                "elapsed_seconds": 1732,
                "date": "2023-05-15T21:20:13"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 456,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:57",
                    "elapsed_seconds": 543,
                    "remaining_seconds": 57
                },
                "elapsed_seconds": 1743,
                "date": "2023-05-15T21:20:32"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 68,
                "y": 62
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 457,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:45",
                    "elapsed_seconds": 555,
                    "remaining_seconds": 45
                },
                "elapsed_seconds": 1755,
                "date": "2023-05-15T21:20:45"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 29,
                "y": 84
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 458,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:45",
                    "elapsed_seconds": 555,
                    "remaining_seconds": 45
                },
                "elapsed_seconds": 1755,
                "date": "2023-05-15T21:20:45"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 459,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:22",
                    "elapsed_seconds": 578,
                    "remaining_seconds": 22
                },
                "elapsed_seconds": 1778,
                "date": "2023-05-15T21:21:07"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 95,
                "y": 61
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 460,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:03",
                    "elapsed_seconds": 597,
                    "remaining_seconds": 3
                },
                "elapsed_seconds": 1797,
                "date": "2023-05-15T21:21:26"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 21,
                "y": 69
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 462,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:03",
                    "elapsed_seconds": 597,
                    "remaining_seconds": 3
                },
                "elapsed_seconds": 1797,
                "date": "2023-05-15T21:21:26"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 465,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:01",
                    "elapsed_seconds": 599,
                    "remaining_seconds": 1
                },
                "elapsed_seconds": 1799,
                "date": "2023-05-15T21:21:35"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 47,
                "y": 90
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 468,
            "code": "FIQ",
            "time": {
                "quarter": {
                    "id": 3,
                    "clock": "00:00:00",
                    "elapsed_seconds": 600,
                    "remaining_seconds": 0
                },
                "elapsed_seconds": 1800,
                "date": "2023-05-15T21:22:28"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 469,
            "code": "IQU",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:10:00",
                    "elapsed_seconds": 0,
                    "remaining_seconds": 600
                },
                "elapsed_seconds": 1800,
                "date": "2023-05-15T21:23:44"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 472,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:52",
                    "elapsed_seconds": 8,
                    "remaining_seconds": 592
                },
                "elapsed_seconds": 1808,
                "date": "2023-05-15T21:23:54"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 54,
                "y": 25
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 473,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:52",
                    "elapsed_seconds": 8,
                    "remaining_seconds": 592
                },
                "elapsed_seconds": 1808,
                "date": "2023-05-15T21:23:54"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 475,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 1820,
                "date": "2023-05-15T21:24:14"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 95,
                "y": 98
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 476,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:40",
                    "elapsed_seconds": 20,
                    "remaining_seconds": 580
                },
                "elapsed_seconds": 1820,
                "date": "2023-05-15T21:24:14"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 478,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:29",
                    "elapsed_seconds": 31,
                    "remaining_seconds": 569
                },
                "elapsed_seconds": 1831,
                "date": "2023-05-15T21:24:36"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 479,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:29",
                    "elapsed_seconds": 31,
                    "remaining_seconds": 569
                },
                "elapsed_seconds": 1831,
                "date": "2023-05-15T21:24:36"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 481,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:17",
                    "elapsed_seconds": 43,
                    "remaining_seconds": 557
                },
                "elapsed_seconds": 1843,
                "date": "2023-05-15T21:24:56"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 8,
                "y": 28
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 482,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:17",
                    "elapsed_seconds": 43,
                    "remaining_seconds": 557
                },
                "elapsed_seconds": 1843,
                "date": "2023-05-15T21:24:56"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 484,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:02",
                    "elapsed_seconds": 58,
                    "remaining_seconds": 542
                },
                "elapsed_seconds": 1858,
                "date": "2023-05-15T21:25:13"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 69,
                "y": 44
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 485,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:02",
                    "elapsed_seconds": 58,
                    "remaining_seconds": 542
                },
                "elapsed_seconds": 1858,
                "date": "2023-05-15T21:25:13"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 486,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:02",
                    "elapsed_seconds": 58,
                    "remaining_seconds": 542
                },
                "elapsed_seconds": 1858,
                "date": "2023-05-15T21:25:38"
            },
            "player": {
                "id": 11916,
                "name": "Gabriel Crepaldi Volpato Galvanini",
                "nickname": "Gabriel Jaú",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 487,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:02",
                    "elapsed_seconds": 58,
                    "remaining_seconds": 542
                },
                "elapsed_seconds": 1858,
                "date": "2023-05-15T21:25:38"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 488,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:02",
                    "elapsed_seconds": 58,
                    "remaining_seconds": 542
                },
                "elapsed_seconds": 1858,
                "date": "2023-05-15T21:26:15"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 489,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:02",
                    "elapsed_seconds": 58,
                    "remaining_seconds": 542
                },
                "elapsed_seconds": 1858,
                "date": "2023-05-15T21:26:29"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 490,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:09:02",
                    "elapsed_seconds": 58,
                    "remaining_seconds": 542
                },
                "elapsed_seconds": 1858,
                "date": "2023-05-15T21:26:45"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 493,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:59",
                    "elapsed_seconds": 61,
                    "remaining_seconds": 539
                },
                "elapsed_seconds": 1861,
                "date": "2023-05-15T21:26:52"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 47,
                "y": 10
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 494,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:59",
                    "elapsed_seconds": 61,
                    "remaining_seconds": 539
                },
                "elapsed_seconds": 1861,
                "date": "2023-05-15T21:26:52"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 496,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:55",
                    "elapsed_seconds": 65,
                    "remaining_seconds": 535
                },
                "elapsed_seconds": 1865,
                "date": "2023-05-15T21:27:11"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 8,
                "y": 44
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 497,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:55",
                    "elapsed_seconds": 65,
                    "remaining_seconds": 535
                },
                "elapsed_seconds": 1865,
                "date": "2023-05-15T21:27:11"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 498,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:28",
                    "elapsed_seconds": 92,
                    "remaining_seconds": 508
                },
                "elapsed_seconds": 1892,
                "date": "2023-05-15T21:27:38"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 67,
                "y": 52
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 499,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:14",
                    "elapsed_seconds": 106,
                    "remaining_seconds": 494
                },
                "elapsed_seconds": 1906,
                "date": "2023-05-15T21:27:51"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 20,
                "y": 77
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 500,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:10",
                    "elapsed_seconds": 110,
                    "remaining_seconds": 490
                },
                "elapsed_seconds": 1910,
                "date": "2023-05-15T21:27:55"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 501,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:10",
                    "elapsed_seconds": 110,
                    "remaining_seconds": 490
                },
                "elapsed_seconds": 1910,
                "date": "2023-05-15T21:27:56"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 22,
                "y": 90
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 502,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:08:10",
                    "elapsed_seconds": 110,
                    "remaining_seconds": 490
                },
                "elapsed_seconds": 1910,
                "date": "2023-05-15T21:27:56"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 504,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:53",
                    "elapsed_seconds": 127,
                    "remaining_seconds": 473
                },
                "elapsed_seconds": 1927,
                "date": "2023-05-15T21:28:16"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 94,
                "y": 61
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 505,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:53",
                    "elapsed_seconds": 127,
                    "remaining_seconds": 473
                },
                "elapsed_seconds": 1927,
                "date": "2023-05-15T21:28:16"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 506,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:53",
                    "elapsed_seconds": 127,
                    "remaining_seconds": 473
                },
                "elapsed_seconds": 1927,
                "date": "2023-05-15T21:28:43"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 507,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:53",
                    "elapsed_seconds": 127,
                    "remaining_seconds": 473
                },
                "elapsed_seconds": 1927,
                "date": "2023-05-15T21:29:06"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 509,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:39",
                    "elapsed_seconds": 141,
                    "remaining_seconds": 459
                },
                "elapsed_seconds": 1941,
                "date": "2023-05-15T21:29:23"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 26,
                "y": 86
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 510,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:35",
                    "elapsed_seconds": 145,
                    "remaining_seconds": 455
                },
                "elapsed_seconds": 1945,
                "date": "2023-05-15T21:29:26"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 511,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:34",
                    "elapsed_seconds": 146,
                    "remaining_seconds": 454
                },
                "elapsed_seconds": 1946,
                "date": "2023-05-15T21:29:29"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 7,
                "y": 57
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 513,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:34",
                    "elapsed_seconds": 146,
                    "remaining_seconds": 454
                },
                "elapsed_seconds": 1946,
                "date": "2023-05-15T21:29:29"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 514,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:32",
                    "elapsed_seconds": 148,
                    "remaining_seconds": 452
                },
                "elapsed_seconds": 1948,
                "date": "2023-05-15T21:29:34"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 80,
                "y": 49
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 515,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:32",
                    "elapsed_seconds": 148,
                    "remaining_seconds": 452
                },
                "elapsed_seconds": 1948,
                "date": "2023-05-15T21:29:34"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 519,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:17",
                    "elapsed_seconds": 163,
                    "remaining_seconds": 437
                },
                "elapsed_seconds": 1963,
                "date": "2023-05-15T21:30:03"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 24,
                "y": 89
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 520,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:14",
                    "elapsed_seconds": 166,
                    "remaining_seconds": 434
                },
                "elapsed_seconds": 1966,
                "date": "2023-05-15T21:30:05"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 521,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:14",
                    "elapsed_seconds": 166,
                    "remaining_seconds": 434
                },
                "elapsed_seconds": 1966,
                "date": "2023-05-15T21:30:06"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 9,
                "y": 57
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 522,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:07:14",
                    "elapsed_seconds": 166,
                    "remaining_seconds": 434
                },
                "elapsed_seconds": 1966,
                "date": "2023-05-15T21:30:06"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 524,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:49",
                    "elapsed_seconds": 191,
                    "remaining_seconds": 409
                },
                "elapsed_seconds": 1991,
                "date": "2023-05-15T21:30:33"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 91,
                "y": 73
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 528,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:38",
                    "elapsed_seconds": 202,
                    "remaining_seconds": 398
                },
                "elapsed_seconds": 2002,
                "date": "2023-05-15T21:30:55"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 8,
                "y": 82
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 529,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:32",
                    "elapsed_seconds": 208,
                    "remaining_seconds": 392
                },
                "elapsed_seconds": 2008,
                "date": "2023-05-15T21:31:01"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 531,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:27",
                    "elapsed_seconds": 213,
                    "remaining_seconds": 387
                },
                "elapsed_seconds": 2013,
                "date": "2023-05-15T21:31:08"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 54,
                "y": 71
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 532,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:27",
                    "elapsed_seconds": 213,
                    "remaining_seconds": 387
                },
                "elapsed_seconds": 2013,
                "date": "2023-05-15T21:31:08"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 533,
            "code": "TET",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:27",
                    "elapsed_seconds": 213,
                    "remaining_seconds": 387
                },
                "elapsed_seconds": 2013,
                "date": "2023-05-15T21:31:35"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 535,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:15",
                    "elapsed_seconds": 225,
                    "remaining_seconds": 375
                },
                "elapsed_seconds": 2025,
                "date": "2023-05-15T21:33:20"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 54,
                "y": 92
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 536,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:15",
                    "elapsed_seconds": 225,
                    "remaining_seconds": 375
                },
                "elapsed_seconds": 2025,
                "date": "2023-05-15T21:33:20"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 537,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:03",
                    "elapsed_seconds": 237,
                    "remaining_seconds": 363
                },
                "elapsed_seconds": 2037,
                "date": "2023-05-15T21:33:31"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 3,
                "y": 56
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 538,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:06:03",
                    "elapsed_seconds": 237,
                    "remaining_seconds": 363
                },
                "elapsed_seconds": 2037,
                "date": "2023-05-15T21:33:31"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 540,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:05:38",
                    "elapsed_seconds": 262,
                    "remaining_seconds": 338
                },
                "elapsed_seconds": 2062,
                "date": "2023-05-15T21:33:57"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 93,
                "y": 97
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 541,
            "code": "RDE",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:05:38",
                    "elapsed_seconds": 262,
                    "remaining_seconds": 338
                },
                "elapsed_seconds": 2062,
                "date": "2023-05-15T21:34:00"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 542,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:05:38",
                    "elapsed_seconds": 262,
                    "remaining_seconds": 338
                },
                "elapsed_seconds": 2062,
                "date": "2023-05-15T21:34:02"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 92,
                "y": 38
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 543,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:05:38",
                    "elapsed_seconds": 262,
                    "remaining_seconds": 338
                },
                "elapsed_seconds": 2062,
                "date": "2023-05-15T21:34:02"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 545,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:05:20",
                    "elapsed_seconds": 280,
                    "remaining_seconds": 320
                },
                "elapsed_seconds": 2080,
                "date": "2023-05-15T21:35:03"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 27,
                "y": 83
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 546,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:05:20",
                    "elapsed_seconds": 280,
                    "remaining_seconds": 320
                },
                "elapsed_seconds": 2080,
                "date": "2023-05-15T21:35:03"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 550,
            "code": "ENT",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:04:43",
                    "elapsed_seconds": 317,
                    "remaining_seconds": 283
                },
                "elapsed_seconds": 2117,
                "date": "2023-05-15T21:35:40"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 95,
                "y": 39
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 551,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:04:37",
                    "elapsed_seconds": 323,
                    "remaining_seconds": 277
                },
                "elapsed_seconds": 2123,
                "date": "2023-05-15T21:35:46"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 4,
                "y": 21
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 552,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:04:37",
                    "elapsed_seconds": 323,
                    "remaining_seconds": 277
                },
                "elapsed_seconds": 2123,
                "date": "2023-05-15T21:35:46"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 553,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:04:12",
                    "elapsed_seconds": 348,
                    "remaining_seconds": 252
                },
                "elapsed_seconds": 2148,
                "date": "2023-05-15T21:36:10"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 79,
                "y": 90
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 555,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:58",
                    "elapsed_seconds": 362,
                    "remaining_seconds": 238
                },
                "elapsed_seconds": 2162,
                "date": "2023-05-15T21:36:25"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 10,
                "y": 50
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 556,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:58",
                    "elapsed_seconds": 362,
                    "remaining_seconds": 238
                },
                "elapsed_seconds": 2162,
                "date": "2023-05-15T21:36:25"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 557,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:58",
                    "elapsed_seconds": 362,
                    "remaining_seconds": 238
                },
                "elapsed_seconds": 2162,
                "date": "2023-05-15T21:36:30"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 10,
                "y": 50
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 558,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:58",
                    "elapsed_seconds": 362,
                    "remaining_seconds": 238
                },
                "elapsed_seconds": 2162,
                "date": "2023-05-15T21:36:30"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 559,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:58",
                    "elapsed_seconds": 362,
                    "remaining_seconds": 238
                },
                "elapsed_seconds": 2162,
                "date": "2023-05-15T21:36:43"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 560,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:58",
                    "elapsed_seconds": 362,
                    "remaining_seconds": 238
                },
                "elapsed_seconds": 2162,
                "date": "2023-05-15T21:36:43"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 561,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:58",
                    "elapsed_seconds": 362,
                    "remaining_seconds": 238
                },
                "elapsed_seconds": 2162,
                "date": "2023-05-15T21:37:06"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 564,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:57",
                    "elapsed_seconds": 363,
                    "remaining_seconds": 237
                },
                "elapsed_seconds": 2163,
                "date": "2023-05-15T21:37:15"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 10,
                "y": 83
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 565,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:57",
                    "elapsed_seconds": 363,
                    "remaining_seconds": 237
                },
                "elapsed_seconds": 2163,
                "date": "2023-05-15T21:37:15"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 566,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:57",
                    "elapsed_seconds": 363,
                    "remaining_seconds": 237
                },
                "elapsed_seconds": 2163,
                "date": "2023-05-15T21:37:47"
            },
            "player": {
                "id": 12742,
                "name": "Lucas Saul Siewert",
                "nickname": "Siewert",
                "number": 25
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 567,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:57",
                    "elapsed_seconds": 363,
                    "remaining_seconds": 237
                },
                "elapsed_seconds": 2163,
                "date": "2023-05-15T21:37:47"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 568,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:57",
                    "elapsed_seconds": 363,
                    "remaining_seconds": 237
                },
                "elapsed_seconds": 2163,
                "date": "2023-05-15T21:37:59"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 569,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:57",
                    "elapsed_seconds": 363,
                    "remaining_seconds": 237
                },
                "elapsed_seconds": 2163,
                "date": "2023-05-15T21:38:20"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 572,
            "code": "VIA",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:45",
                    "elapsed_seconds": 375,
                    "remaining_seconds": 225
                },
                "elapsed_seconds": 2175,
                "date": "2023-05-15T21:38:35"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 13,
                "y": 75
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 574,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:32",
                    "elapsed_seconds": 388,
                    "remaining_seconds": 212
                },
                "elapsed_seconds": 2188,
                "date": "2023-05-15T21:38:57"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 92,
                "y": 97
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 575,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:28",
                    "elapsed_seconds": 392,
                    "remaining_seconds": 208
                },
                "elapsed_seconds": 2192,
                "date": "2023-05-15T21:39:00"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 576,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:18",
                    "elapsed_seconds": 402,
                    "remaining_seconds": 198
                },
                "elapsed_seconds": 2202,
                "date": "2023-05-15T21:39:11"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 5,
                "y": 4
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 577,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:03:14",
                    "elapsed_seconds": 406,
                    "remaining_seconds": 194
                },
                "elapsed_seconds": 2206,
                "date": "2023-05-15T21:39:14"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 578,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:02:57",
                    "elapsed_seconds": 423,
                    "remaining_seconds": 177
                },
                "elapsed_seconds": 2223,
                "date": "2023-05-15T21:39:32"
            },
            "player": {
                "id": 433,
                "name": "Elio Corazza Neto",
                "nickname": "Elinho",
                "number": 5
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 66,
                "y": 76
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 579,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:02:57",
                    "elapsed_seconds": 423,
                    "remaining_seconds": 177
                },
                "elapsed_seconds": 2223,
                "date": "2023-05-15T21:39:32"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 580,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:02:53",
                    "elapsed_seconds": 427,
                    "remaining_seconds": 173
                },
                "elapsed_seconds": 2227,
                "date": "2023-05-15T21:39:36"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 8,
                "y": 55
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 581,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:02:27",
                    "elapsed_seconds": 453,
                    "remaining_seconds": 147
                },
                "elapsed_seconds": 2253,
                "date": "2023-05-15T21:40:02"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 96,
                "y": 40
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 582,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:02:24",
                    "elapsed_seconds": 456,
                    "remaining_seconds": 144
                },
                "elapsed_seconds": 2256,
                "date": "2023-05-15T21:40:05"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 583,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:02:19",
                    "elapsed_seconds": 461,
                    "remaining_seconds": 139
                },
                "elapsed_seconds": 2261,
                "date": "2023-05-15T21:40:10"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 5,
                "y": 57
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 584,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:02:19",
                    "elapsed_seconds": 461,
                    "remaining_seconds": 139
                },
                "elapsed_seconds": 2261,
                "date": "2023-05-15T21:40:10"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 585,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:58",
                    "elapsed_seconds": 482,
                    "remaining_seconds": 118
                },
                "elapsed_seconds": 2282,
                "date": "2023-05-15T21:40:31"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 94,
                "y": 4
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 586,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:58",
                    "elapsed_seconds": 482,
                    "remaining_seconds": 118
                },
                "elapsed_seconds": 2282,
                "date": "2023-05-15T21:40:31"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 587,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 2291,
                "date": "2023-05-15T21:40:40"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 18,
                "y": 94
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 588,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:49",
                    "elapsed_seconds": 491,
                    "remaining_seconds": 109
                },
                "elapsed_seconds": 2291,
                "date": "2023-05-15T21:40:40"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 589,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:31",
                    "elapsed_seconds": 509,
                    "remaining_seconds": 91
                },
                "elapsed_seconds": 2309,
                "date": "2023-05-15T21:40:58"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 93,
                "y": 3
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 590,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:31",
                    "elapsed_seconds": 509,
                    "remaining_seconds": 91
                },
                "elapsed_seconds": 2309,
                "date": "2023-05-15T21:40:58"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 592,
            "code": "SBS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:28",
                    "elapsed_seconds": 512,
                    "remaining_seconds": 88
                },
                "elapsed_seconds": 2312,
                "date": "2023-05-15T21:41:09"
            },
            "player": {
                "id": 12750,
                "name": "Lucas Wayne Martinez",
                "nickname": "Martinez",
                "number": 25
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 593,
            "code": "SBE",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:28",
                    "elapsed_seconds": 512,
                    "remaining_seconds": 88
                },
                "elapsed_seconds": 2312,
                "date": "2023-05-15T21:41:09"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 596,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:27",
                    "elapsed_seconds": 513,
                    "remaining_seconds": 87
                },
                "elapsed_seconds": 2313,
                "date": "2023-05-15T21:41:24"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 7,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 597,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:27",
                    "elapsed_seconds": 513,
                    "remaining_seconds": 87
                },
                "elapsed_seconds": 2313,
                "date": "2023-05-15T21:41:29"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 7,
                "y": 60
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 598,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:27",
                    "elapsed_seconds": 513,
                    "remaining_seconds": 87
                },
                "elapsed_seconds": 2313,
                "date": "2023-05-15T21:41:29"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 599,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:27",
                    "elapsed_seconds": 513,
                    "remaining_seconds": 87
                },
                "elapsed_seconds": 2313,
                "date": "2023-05-15T21:41:47"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 603,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:24",
                    "elapsed_seconds": 516,
                    "remaining_seconds": 84
                },
                "elapsed_seconds": 2316,
                "date": "2023-05-15T21:42:00"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 91,
                "y": 64
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 604,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:17",
                    "elapsed_seconds": 523,
                    "remaining_seconds": 77
                },
                "elapsed_seconds": 2323,
                "date": "2023-05-15T21:42:07"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 605,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:16",
                    "elapsed_seconds": 524,
                    "remaining_seconds": 76
                },
                "elapsed_seconds": 2324,
                "date": "2023-05-15T21:42:09"
            },
            "player": {
                "id": 13121,
                "name": "Jose Ignacio Vildoza",
                "nickname": "Vildoza",
                "number": 11
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 15,
                "y": 54
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 607,
            "code": "FAC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:10",
                    "elapsed_seconds": 530,
                    "remaining_seconds": 70
                },
                "elapsed_seconds": 2330,
                "date": "2023-05-15T21:42:19"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 66,
                "y": 34
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 608,
            "code": "FAR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:10",
                    "elapsed_seconds": 530,
                    "remaining_seconds": 70
                },
                "elapsed_seconds": 2330,
                "date": "2023-05-15T21:42:19"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 609,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:10",
                    "elapsed_seconds": 530,
                    "remaining_seconds": 70
                },
                "elapsed_seconds": 2330,
                "date": "2023-05-15T21:42:51"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 610,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:10",
                    "elapsed_seconds": 530,
                    "remaining_seconds": 70
                },
                "elapsed_seconds": 2330,
                "date": "2023-05-15T21:43:09"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 612,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:01:01",
                    "elapsed_seconds": 539,
                    "remaining_seconds": 61
                },
                "elapsed_seconds": 2339,
                "date": "2023-05-15T21:43:23"
            },
            "player": {
                "id": 146,
                "name": "Guilherme Pereira Deodato",
                "nickname": "Gui Deodato",
                "number": 9
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 29,
                "y": 72
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 613,
            "code": "REO",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:56",
                    "elapsed_seconds": 544,
                    "remaining_seconds": 56
                },
                "elapsed_seconds": 2344,
                "date": "2023-05-15T21:43:27"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 614,
            "code": "A2E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:56",
                    "elapsed_seconds": 544,
                    "remaining_seconds": 56
                },
                "elapsed_seconds": 2344,
                "date": "2023-05-15T21:43:27"
            },
            "player": {
                "id": 13122,
                "name": "Martin Nicolas Cuello",
                "nickname": "Cuello",
                "number": 44
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 6,
                "y": 50
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 615,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:53",
                    "elapsed_seconds": 547,
                    "remaining_seconds": 53
                },
                "elapsed_seconds": 2347,
                "date": "2023-05-15T21:43:30"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 617,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:52",
                    "elapsed_seconds": 548,
                    "remaining_seconds": 52
                },
                "elapsed_seconds": 2348,
                "date": "2023-05-15T21:43:34"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 18,
                "y": 61
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 618,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:52",
                    "elapsed_seconds": 548,
                    "remaining_seconds": 52
                },
                "elapsed_seconds": 2348,
                "date": "2023-05-15T21:43:34"
            },
            "player": {
                "id": 482,
                "name": "Carlos Alexandre Rodrigues do Nascimento",
                "nickname": "Olivinha",
                "number": 16
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 619,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:45",
                    "elapsed_seconds": 555,
                    "remaining_seconds": 45
                },
                "elapsed_seconds": 2355,
                "date": "2023-05-15T21:43:38"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 32,
                "y": 77
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 620,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:42",
                    "elapsed_seconds": 558,
                    "remaining_seconds": 42
                },
                "elapsed_seconds": 2358,
                "date": "2023-05-15T21:43:41"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 621,
            "code": "A3C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:40",
                    "elapsed_seconds": 560,
                    "remaining_seconds": 40
                },
                "elapsed_seconds": 2360,
                "date": "2023-05-15T21:43:43"
            },
            "player": {
                "id": 12617,
                "name": "Malcolm Jamal Miller",
                "nickname": "Miller",
                "number": 33
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 77,
                "y": 89
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 622,
            "code": "ASS",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:40",
                    "elapsed_seconds": 560,
                    "remaining_seconds": 40
                },
                "elapsed_seconds": 2360,
                "date": "2023-05-15T21:43:43"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 630,
            "code": "ERR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:37",
                    "elapsed_seconds": 563,
                    "remaining_seconds": 37
                },
                "elapsed_seconds": 2363,
                "date": "2023-05-15T21:45:53"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 32,
                "y": 62
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 631,
            "code": "BOR",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:37",
                    "elapsed_seconds": 563,
                    "remaining_seconds": 37
                },
                "elapsed_seconds": 2363,
                "date": "2023-05-15T21:45:53"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 632,
            "code": "A2C",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:32",
                    "elapsed_seconds": 568,
                    "remaining_seconds": 32
                },
                "elapsed_seconds": 2368,
                "date": "2023-05-15T21:45:58"
            },
            "player": {
                "id": 711,
                "name": "Henrique Coelho",
                "nickname": "Coelho",
                "number": 10
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": {
                "x": 95,
                "y": 42
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 639,
            "code": "LLC",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:29",
                    "elapsed_seconds": 571,
                    "remaining_seconds": 29
                },
                "elapsed_seconds": 2371,
                "date": "2023-05-15T21:47:21"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 641,
            "code": "A3E",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:24",
                    "elapsed_seconds": 576,
                    "remaining_seconds": 24
                },
                "elapsed_seconds": 2376,
                "date": "2023-05-15T21:47:38"
            },
            "player": {
                "id": 478,
                "name": "Ricardo Fischer",
                "nickname": "Fischer",
                "number": 5
            },
            "team": {
                "id": 2,
                "name": "Flamengo",
                "acronym": "FLA"
            },
            "position": {
                "x": 33,
                "y": 57
            },
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 643,
            "code": "RED",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:22",
                    "elapsed_seconds": 578,
                    "remaining_seconds": 22
                },
                "elapsed_seconds": 2378,
                "date": "2023-05-15T21:47:42"
            },
            "player": {
                "id": 134,
                "name": "José Roberto Nardi Duarte",
                "nickname": "Betinho",
                "number": 26
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        },
        {
            "match": {
                "league_id": 1,
                "league_name": "NBB",
                "match_id": 24890,
                "season": 2022,
                "phase": "Playoffs",
                "home_team": {
                    "id": 285,
                    "name": "São Paulo Futebol Clube",
                    "acronym": "SAO"
                },
                "away_team": {
                    "id": 2,
                    "name": "Flamengo",
                    "acronym": "FLA"
                },
                "name": "SAO 96 x 79 FLA (2023-05-15 20:00:00)",
                "score": {
                    "home": 96,
                    "away": 79
                },
                "venue": "Pol. Dr. Antonio Leme Nunes Galvão",
                "has_video": null,
                "date": "2023-05-15T20:00:00"
            },
            "event_id": 646,
            "code": "FIQ",
            "time": {
                "quarter": {
                    "id": 4,
                    "clock": "00:00:00",
                    "elapsed_seconds": 600,
                    "remaining_seconds": 0
                },
                "elapsed_seconds": 2400,
                "date": "2023-05-15T21:49:46"
            },
            "player": {
                "id": 367,
                "name": "Marcus Vinícius Vieira de Sousa",
                "nickname": "Marquinhos",
                "number": 11
            },
            "team": {
                "id": 285,
                "name": "São Paulo Futebol Clube",
                "acronym": "SAO"
            },
            "position": null,
            "is_favorite": false
        }
    ]

    current_page = 1;
    current_page_items = 0

    ngOnInit(): void {
        this.startInterval();
        // // Inicialize dados ou faça chamadas para APIs se necessário
        // let four_factors = this.calculateFourFactors(this.events)
        // let selected_point = four_factors.at(-1)
        
        // this.fill_charts_four_factors(four_factors, 'eFG %', 'chart-efg', 'efg')
        // this.fill_charts_four_factors(four_factors, 'TOV %', 'chart-tov', 'tov')
        // this.fill_charts_four_factors(four_factors, 'ORB %', 'chart-orb', 'orb')
        // this.fill_charts_four_factors(four_factors, 'DRB %', 'chart-drb', 'drb')
        // this.fill_charts_four_factors(four_factors, 'FTR %', 'chart-ftr', 'ft')
        // this.get_four_factors_breakdown(selected_point)
        
    }

    ngAfterViewInit(): void {
        // Inicializa o Select2 no elemento com o id "select2-example"
        // $('#select-league').select2();
        this.fill_select_team()

        $(document).ready(() => {
            $('#liveToast').toast({ autohide: true, delay: 5000 });
        });
        

        $('#select-league').on('change', (event: any) => {
            const selectedValue = $(event.target).val(); // Obtém o valor selecionado
            if (selectedValue) {
                this.fill_select_season(selectedValue); // Chama a função com o valor selecionado
            }
        });

        $('#select-season').on('change', () => {
            const selected_league = $('#select-league').val(); // Obtém o valor selecionado
            const selected_season = $('#select-season').val(); // Obtém o valor selecionado
            const selected_team = $('#select-team').val(); // Obtém o valor selecionado
            if (selected_season) {
                console.log(selected_season)
                this.fill_select_match(selected_league, selected_season, selected_team); // Chama a função com o valor selecionado
            }
        });

        $('#select-team').on('change', () => {
            const selected_league = $('#select-league').val(); // Obtém o valor selecionado
            const selected_team = $('#select-team').val(); // Obtém o valor selecionado
            if (selected_team) {
            this.fill_select_leagues(); // Chama a função com o valor selecionado
            }
        });

        $('#select-match').on('change', async () => {
            const selected_league = $('#select-league').val(); // Obtém o valor selecionado
            const selected_team = $('#select-team').val(); // Obtém o valor selecionado
            const selected_match = $('#select-match').val(); // Obtém o valor selecionado
            console.log(`Pesquisando jogo ${$('#select-match').select2('data')[0].score}`)
    
            if (selected_team && selected_league && selected_match) {
                try {
                    // Chama a função com await dentro do 'async' para buscar todos os eventos
                    this.current_page = 1
                    $("#charts-container").hide()
                    $('#loader').show();
                    this.events = []
                    this.get_home_and_away_players(Number(selected_league), Number(selected_match))
                    console.log(this.home_players, 'aqui 1')
                    this.events = await this.getAllMatchEvents(Number(selected_league), Number(selected_team), Number(selected_match));
                    $('#loader').hide();
                    console.log(this.events)
                    if (this.events.length !== 0){
                        $("#charts-container").show()
                    }
                    else{
                        this.showNotification('Nenhum dado retornado') 
                    }
                } catch (error) {
                    console.error('Erro ao obter os eventos:', error);
                }
            }
        });
    }

    showNotification(message: string) {
        $('.toast-body').text(message);
        $('#liveToast').toast('show');
    }

    ngOnDestroy() {
    // Limpa o intervalo ao destruir o componente para evitar chamadas desnecessárias
        this.clearInterval();
    }

    is_match_ongoing(league_id: number, match_id: number){
        const apiUrl = `https://apibird.tecgraf.puc-rio.br/v1/matches/${league_id}/${match_id}/ongoing`; 

        $.ajax({
            url: apiUrl,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc' // Adiciona o cabeçalho de autorização
            },
            success: (data: boolean) => {
                this.match_is_ongoing = data
            },
            error: (error: Record<string, any>) => {
                console.error('Erro ao carregar os dados:', error);
            }
            });
    }

    fill_select_leagues(): void {
        // URL da API - substitua pelo endpoint real da sua API
        const apiUrl = 'https://apibird.tecgraf.puc-rio.br/v1/leagues'; 

        // Fazendo a requisição AJAX com jQuery para obter os dados
        $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc' // Adiciona o cabeçalho de autorização
        },
        success: (data: Array<any>) => {
            const selectData = data.map((league: any) => {
                return { id: league.id, text: league.name }; // Define o formato esperado pelo Select2
            });

            $('#select-league').html('<option></option>'); 

            $('#select-league').select2({
                data: selectData,
                placeholder: 'Selecione uma liga',
                allowClear: true
            });
            
        },
        error: (error: Record<string, any>) => {
            console.error('Erro ao carregar os dados:', error);
        }
        });
    }

    get_match_players(league_id: number, match_id: number, teams: any): any {
        // URL da API - substitua pelo endpoint real da sua API
        const apiUrl = `https://apibird.tecgraf.puc-rio.br/v1/matches/${league_id}/${match_id}/players`; 

        // Fazendo a requisição AJAX com jQuery para obter os dados
        $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc' // Adiciona o cabeçalho de autorização
        },
        success: (data: any) => {
            const colors = Highcharts.getOptions().colors || []; 

            if (teams.home !== undefined){
                this.home_players = data[teams.home]
                    .sort((a:any, b:any) => b.id - a.id)
                    .map((player: any, index: number) => {
                        return {
                            ...player, // Copia todos os atributos existentes do jogador
                            color: colors[index % colors.length] // Atribui uma cor baseada no índice, usando cores de forma cíclica
                        };
                    });

            }

            if (teams.away !== undefined){
                this.away_players = data[teams.away]
                    .sort((a:any, b:any) => b.id - a.id)
                    .map((player: any, index: number) => {
                        return {
                            ...player, // Copia todos os atributos existentes do jogador
                            color: colors[index % colors.length] // Atribui uma cor baseada no índice, usando cores de forma cíclica
                        };
                    });
            }
        },
        error: (error: Record<string, any>) => {
            console.error('Erro ao carregar os dados:', error); 
        }
        });
    }  


    get_home_and_away_players(league_id: number, match_id: number): any {
        // URL da API - substitua pelo endpoint real da sua API
        const apiUrl = `https://apibird.tecgraf.puc-rio.br/v1/matches/${league_id}/${match_id}`; 

        // Fazendo a requisição AJAX com jQuery para obter os dados
        $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc' // Adiciona o cabeçalho de autorização
        },
        success: (data: { home_team: { name: string }, away_team: { name: string } }) => {
            let teams = {'home': data.home_team.name, 'away': data.away_team.name}
            this.get_match_players(league_id, match_id, teams)
        },
        error: (error: Record<string, any>) => {
            console.error('Erro ao carregar os dados:', error); 
        }
        });
    } 

    fill_select_season(league_id: any): void {
        // URL da API - substitua pelo endpoint real da sua API
        const apiUrl = `https://apibird.tecgraf.puc-rio.br/v1/leagues/${league_id}/seasons`; 

        // Fazendo a requisição AJAX com jQuery para obter os dados
        $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc' // Adiciona o cabeçalho de autorização
        },
        data: {
            league: league_id,
        },
        success: (data: Array<any>) => {
            data = data.reverse()
            const selectData = data.map((year: number) => {
                return { id: year, text: year.toString() }; // Define o formato esperado pelo Select2
            });

            $('#select-season').html('<option></option>'); 

            $('#select-season').select2({
                data: selectData,
                placeholder: 'Selecione uma temporada',
                allowClear: true
            });
            
        },
        error: (error: Record<string, any>) => {
            console.error('Erro ao carregar os dados:', error);
        }
        });
    }

    fill_select_team(): void {
        // URL da API - substitua pelo endpoint real da sua API
        const apiUrl = 'https://apibird.tecgraf.puc-rio.br/v1/teams'; 

        // Fazendo a requisição AJAX com jQuery para obter os dados
        $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc' // Adiciona o cabeçalho de autorização
        },
        success: (data: Array<any>) => {
            const selectData = data.map((team: any) => {
                return { id: team.id, text: team.name }; // Define o formato esperado pelo Select2
            });

            $('#select-team').html('<option></option>'); 

            $('#select-team').select2({
                data: selectData,
                placeholder: 'Selecione um time',
                allowClear: true
            });
            
        },
        error: (error: Record<string, any>) => {
            console.error('Erro ao carregar os dados:', error); 
        }
        });
    }

  fill_select_match(league_id: any, season: any, team_id: any): void {
    // URL da API - substitua pelo endpoint real da sua API
    const apiUrl = 'https://apibird.tecgraf.puc-rio.br/v1/matches/' + String(league_id);
  
    // Fazendo a requisição AJAX com jQuery para obter os dados
    $.ajax({
      url: apiUrl,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc' // Adiciona o cabeçalho de autorização
      },
      data: {
        season: season,
        team: team_id,
        sort: 'date',
        order: 'desc',
        limit: 200
      },
      success: (response: Record<string, any>) => {
        const data = response['data'];
  
        const selectData = data.map((match: any) => {
            // Extraindo a parte do placar e da data
            const [score, rawDate] = match.name.split('(');
            
            // Formata a data para o formato DD/MM/YYYY HH:mm
            const matchDate = new Date(rawDate.replace(')', ''));
            const formattedDate = matchDate.toLocaleDateString('pt-BR') + ' ' + matchDate.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            });
            
            // Retorna o objeto com o placar separado da data
            return {
                id: match.match_id,
                score: score.trim(),
                date: formattedDate
            };
        });
        
        $('#select-match').html('<option></option>');
        
        $('#select-match').select2({
            data: selectData,
            placeholder: 'Selecione uma partida',
            allowClear: true,
            escapeMarkup: function(markup: any) {
                return markup; // Permite o HTML personalizado
            },
            templateResult: function(data: any) {
                // Verifica se o item possui informações válidas
                if (!data.id) {
                    return data.text; // Para o placeholder ou resultados sem conteúdo
                }
        
                // Cria o HTML customizado com o placar e a data
                const markup = `
                    <div>
                        <strong>${data.score}</strong><br>
                        <small style="color: gray;">${data.date}</small>
                    </div>
                `;
        
                return $(markup);
            },
            templateSelection: function(data: any) {
                return data.score || data.text;
            }
        });
  
  
      },
      error: (error: Record<string, any>) => {
        console.error('Erro ao carregar os dados:', error);
      }
    });
  }

  charts: Highcharts.Chart[] = [];

  fill_charts_four_factors(
    four_factors: FourFactorsData[],
    title: string,
    container_id: string,
    serie: keyof FourFactorsMetrics
  ) {
    const instance = this

    function formatTimeForQuarterAndOT(elapsedSeconds: number): string {
        // Usa a função calculateQuarter para determinar se é um quarter ou overtime
        const period = calculateQuarter2(elapsedSeconds);
    
        // Usa a função calculateTimeRemainingInQuarter para determinar o tempo restante no período atual
        const elapsed_seconds = calculateElapsedTimeInQuarter(elapsedSeconds);
    
        // Se estivermos exatamente no início de um quarter ou prorrogação, retorna o indicador apropriado
        if (elapsed_seconds === '0:00') {
            if (period !== 'Q0')
                return period;
        }

        // Retorna o tempo restante no formato MM:SS
        return elapsed_seconds;
    }
    
    // Função para calcular o quarter ou overtime
    function calculateQuarter1(elapsedSeconds: number): string {
        const quarterLength = 600; // 10 minutos (600 segundos) por quarter
        const overtimeLength = 300; // 5 minutos (300 segundos) por prorrogação
    
        if (elapsedSeconds <= 4 * quarterLength) {
            const quarter = Math.floor(elapsedSeconds / quarterLength) + 1;
            return `Q${quarter}`; // Retorna o número do quarter (Q1, Q2, Q3, Q4)
        } else {
            const overtimePeriod = Math.floor((elapsedSeconds - 4 * quarterLength) / overtimeLength) + 1;
            return `OT${overtimePeriod}`; // Retorna o número da prorrogação (OT1, OT2, etc.)
        }
    }

    function calculateQuarter2(elapsedSeconds: number): string {
        const quarterLength = 600; // 10 minutos (600 segundos) por quarter
        const overtimeLength = 300; // 5 minutos (300 segundos) por prorrogação
    
        if (elapsedSeconds <= 4 * quarterLength) {
            const quarter = Math.floor(elapsedSeconds / quarterLength) ;
            return `Q${quarter}`; // Retorna o número do quarter (Q1, Q2, Q3, Q4)
        } else {
            const overtimePeriod = Math.floor((elapsedSeconds - 4 * quarterLength) / overtimeLength) ;
            return `OT${overtimePeriod}`; // Retorna o número da prorrogação (OT1, OT2, etc.)
        }
    }

    function calculateElapsedTimeInQuarter(elapsedSeconds: number): string {
        const quarterLength = 600; // 10 minutos (600 segundos) por quarter
        const overtimeLength = 300; // 5 minutos (300 segundos) por prorrogação
    
        if (elapsedSeconds <= 4 * quarterLength) {
            const timeInQuarter = elapsedSeconds % quarterLength;
            const minutesElapsed = Math.floor(timeInQuarter / 60);
            const secondsElapsed = timeInQuarter % 60;
            return `${minutesElapsed}:${secondsElapsed.toString().padStart(2, '0')}`;
        } else {
            const timeInOvertime = (elapsedSeconds - 4 * quarterLength) % overtimeLength;
            const minutesElapsedOT = Math.floor(timeInOvertime / 60);
            const secondsElapsedOT = timeInOvertime % 60;
            return `${minutesElapsedOT}:${secondsElapsedOT.toString().padStart(2, '0')}`;
        }
    }
    
    // Função para calcular o tempo restante no quarter ou overtime
    function calculateTimeRemainingInQuarter(elapsedSeconds: number): string {
        const quarterLength = 600; // 10 minutos (600 segundos) por quarter
        const overtimeLength = 300; // 5 minutos (300 segundos) por prorrogação
    
        if (elapsedSeconds <= 4 * quarterLength) {
            const timeInQuarter = elapsedSeconds % quarterLength;
            const minutesRemaining = Math.floor((quarterLength - timeInQuarter) / 60);
            const secondsRemaining = (quarterLength - timeInQuarter) % 60;
            return `${minutesRemaining}:${secondsRemaining.toString().padStart(2, '0')}`;
        } else {
            const timeInOvertime = (elapsedSeconds - 4 * quarterLength) % overtimeLength;
            const minutesRemainingOT = Math.floor((overtimeLength - timeInOvertime) / 60);
            const secondsRemainingOT = (overtimeLength - timeInOvertime) % 60;
            return `${minutesRemainingOT}:${secondsRemainingOT.toString().padStart(2, '0')}`;
        }
    }

      
      // Gerar as categorias no formato de quarters, prorrogações e tempo restante
    // const formattedCategories = four_factors.map(f => formatTimeForQuarterAndOT(f.elapsed_time));
    const formattedCategories = four_factors.map(f => String(f.elapsed_time));
      
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'line',
        zooming: {
            type: 'x'
        },
        events: {
          selection: function (event) {
            if (event.xAxis) {
              // O usuário fez uma seleção no eixo x
              const xAxis = this.xAxis[0];
              const min = event.xAxis[0].min;
              const max = event.xAxis[0].max;

              // Como estamos usando categorias, as posições são índices
              const minIndex = Math.floor(min);
              const maxIndex = Math.ceil(max);
              const categories = xAxis.categories;

              const minCategory = Number(categories[minIndex]);
              const maxCategory = Number(categories[maxIndex]);

              let four_factors = instance.calculateFourFactors(instance.events, minCategory, maxCategory)
              console.log(four_factors)
              let selected_point = [...four_factors].reverse().find(obj => {
                // Verifica se algum valor em 'home' não é null
                const homeHasValues = Object.values(obj.home).some(value => value !== null);
              
                // Verifica se algum valor em 'away' não é null
                const awayHasValues = Object.values(obj.away).some(value => value !== null);
              
                // Retorna true se 'home' ou 'away' tiverem pelo menos um valor não null
                return homeHasValues || awayHasValues;
              });
              console.log(selected_point)
              instance.get_four_factors_breakdown(selected_point)
            
              instance.fill_charts_four_factors(four_factors, 'Pontuação', 'chart-pontos', 'pontos')
              instance.fill_charts_four_factors(four_factors, 'eFG %', 'chart-efg', 'efg')
              instance.fill_charts_four_factors(four_factors, 'TOV %', 'chart-tov', 'tov')
              instance.fill_charts_four_factors(four_factors, 'ORB %', 'chart-orb', 'orb')
              instance.fill_charts_four_factors(four_factors, 'DRB %', 'chart-drb', 'drb')
              instance.fill_charts_four_factors(four_factors, 'FTR %', 'chart-ftr', 'ft')

              console.log('Intervalo selecionado:', minCategory, 'a', maxCategory);
            } else {
              // Seleção resetada (por exemplo, ao clicar em "Resetar zoom")
              console.log('Seleção resetada');
            }

            // Retorna 'true' para permitir a ação padrão (zoom)
            return false;
          },
          load: function () {
            // 'this' refere-se ao gráfico (chart) atual
            const chart = this;
      
            // Adiciona o evento de 'dblclick' ao container do gráfico
            chart.container.addEventListener('dblclick', (event) => {
              event.stopPropagation(); // Evita a propagação do evento
      
              // Função que você deseja chamar ao dar um double click em qualquer lugar do gráfico
              let four_factors = instance.calculateFourFactors(instance.events)

              instance.fill_charts_four_factors(four_factors, 'Pontuação', 'chart-pontos', 'pontos')
              instance.fill_charts_four_factors(four_factors, 'eFG %', 'chart-efg', 'efg')
              instance.fill_charts_four_factors(four_factors, 'TOV %', 'chart-tov', 'tov')
              instance.fill_charts_four_factors(four_factors, 'ORB %', 'chart-orb', 'orb')
              instance.fill_charts_four_factors(four_factors, 'DRB %', 'chart-drb', 'drb')
              instance.fill_charts_four_factors(four_factors, 'FTR %', 'chart-ftr', 'ft')           
              
              let selected_point = four_factors.at(-1)
              instance.get_four_factors_breakdown(selected_point)
            });
          }
        }
      },
      title: {
        text: ''
      },
      xAxis: {
        title: {
          text: ''
        },
        crosshair: {
          color: 'rgba(0, 0, 0, 0.4)', // Define a cor do crosshair (preto com 70% de opacidade)
          dashStyle: 'Solid', // Define o estilo da linha
        },
        categories: formattedCategories,
        labels: {
            step: 1, // Força a exibição de todos os labels
            rotation: 0,
            formatter: function () {
              // Exibe apenas as labels relevantes (início de quarters e tempos restantes)
              const label = formatTimeForQuarterAndOT(Number(this.value)) ;
              return label.includes('Q') || label.includes('OT') ? label : ''; 
            }
          }
      },
      yAxis: {
        title: {
          text: title
        },
        labels: {
            format: title === "Pontuação" ? '{value}' : '{value}%' // Define o formato baseado no título
        }
      },
      legend: {
        enabled: false // Desativa a legenda
      },
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderWidth: 1,
        borderColor: '#AAA',
        shadow: false,
        style: {
          fontSize: '12px'
        },
        positioner: function (labelWidth, labelHeight, point) {
          // Posiciona o tooltip no canto superior direito
          return { x: this.chart.chartWidth - labelWidth - 10, y: 10 };
        },
        formatter: function () {
            const remaining_time = calculateTimeRemainingInQuarter(Number(this.x));
            const quarter = calculateQuarter1(Number(this.x));
        
            let s = `<b>${quarter} - ${remaining_time}</b></br>`;
        
            if (this.points) {
                this.points.forEach(function (point) {
                    // Condição para verificar se o gráfico é de pontuação
                    const isScoreChart = title === 'Pontuação';
                    s +=
                        '<span style="color:' +
                        point.color +
                        '">' + point.series.name + '</span>: ' +
                        point.y?.toFixed(isScoreChart ? 0 : 2) + // Formata como inteiro se for gráfico de pontuação
                        (isScoreChart ? '' : '%') + // Adiciona '%' apenas se não for gráfico de pontuação
                        '<br/>';
                });
            } else if (this.point) {
                const isScoreChart = title === 'Pontuação';
                s +=
                    '<span style="color:' +
                    this.point.color +
                    '">\u25CF</span> ' +
                    this.point.series.name + ': ' +
                    this.point.y?.toFixed(isScoreChart ? 0 : 2) +
                    (isScoreChart ? '' : '%') +
                    '<br/>';
            }
            return s;
        }
      },
      plotOptions: {
        series: {
          cursor: 'pointer', // Muda o cursor para indicar que os pontos são clicáveis
          point: {
            events: {
              click: function () {
                const xIndex = this.x; // Captura o índice do ponto clicado no eixo X

                // Desenha o crosshair nos gráficos específicos no mesmo índice
                instance.updateSpecificChartsCrosshair(xIndex);                
                const selected_point = four_factors.filter(objeto => String(objeto.elapsed_time) === this.category).at(-1)

                // Agora você pode chamar um método da sua classe usando 'self'
                if (selected_point) {
                    instance.get_four_factors_breakdown(selected_point);
                }
              }
            }
          }
        }
      },
      series: [
        {
          type: 'line',
          name: 'Home',
          data: four_factors.map(f => (f.home[serie] ?? null) !== null 
            ? (title === "Pontuação" ? f.home[serie]! : f.home[serie]! * 100) 
            : null),
          color: 'blue'
        },
        {
          type: 'line',
          name: 'Away',
          data: four_factors.map(f => (f.away[serie] ?? null) !== null 
            ? (title === "Pontuação" ? f.away[serie]! : f.away[serie]! * 100) 
            : null),
          color: 'red'
        }
      ]
    };

    // Inicializa o gráfico usando o contêiner com ID fornecido
    const chart = Highcharts.chart(container_id, chartOptions);
    this.charts.push(chart);
  }

  updateSpecificChartsCrosshair(xIndex: number | null) {
    const chartIds = ['chart-efg', 'chart-tov', 'chart-orb', 'chart-drb', 'chart-ftr', 'chart-pontos']; // IDs dos gráficos
  
    chartIds.forEach(chartId => {
      const chart = $(`#${chartId}`).highcharts()// Obtém o gráfico pelo ID do contêiner

      if (chart) {
        const xAxis = chart.xAxis[0];
  
        // Remove qualquer crosshair existente
        xAxis.removePlotLine('fixedCrosshair');
  
        if (xIndex !== null) {
          // Desenha o novo crosshair no gráfico específico
          xAxis.addPlotLine({
            value: xIndex,  // Usa o índice do eixo X (número) clicado
            color: 'rgba(0, 0, 0, 0.4)',
            width: 1,
            id: 'fixedCrosshair',
            zIndex: 3
          });
        }
      }
    });
  }

  async getAllMatchEvents(
    league_id: number,
    team_id: number,
    match_id: number,
  ): Promise<any[]> {
    // URL da API para obter os eventos da partida
    const apiUrl = `https://apibird.tecgraf.puc-rio.br/v1/events/${league_id}/${match_id}`;
  
    try {
      const response: any = await $.ajax({
        url: apiUrl,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcGlfdG9rZW46MyIsInNjb3BlcyI6ImNvcmUifQ.CQgdjWXTWTtr9pwUliGo0__1_5rcEHj4tTxqpCZUekc'
        },
        data: {
          page: this.current_page
        }
      });
      console.log(match_id, league_id, team_id)
      console.log(`Pesquisando página ${this.current_page} | Eventos: ${this.events.length}`)
      // Acumula os eventos da página atual
      const total_pages = Math.ceil(response['total'] / 100); // Ajuste o tamanho da página conforme necessário
  
      // Verifica se há mais páginas para buscar
      if (this.current_page < total_pages) {
        console.log('aqui')
        // Se há mais páginas, chama recursivamente para a próxima página
        this.current_page += 1
        this.events = this.events.concat(response['data']);
        console.log(response['data'].lenght)
        return await this.getAllMatchEvents(league_id, team_id, match_id);
      } else {
        const existingEventIds = new Set(this.events.map(event => event.event_id));
        const filteredData = response['data'].filter((item: any) => !existingEventIds.has(item.event_id));
        
        this.events = this.events.concat(filteredData);
        if (filteredData.length !== 0){
            let four_factors = this.calculateFourFactors(this.events);
            this.fill_charts_four_factors(four_factors, 'Pontuação', 'chart-pontos', 'pontos')   
            this.fill_charts_four_factors(four_factors, 'eFG %', 'chart-efg', 'efg')
            this.fill_charts_four_factors(four_factors, 'TOV %', 'chart-tov', 'tov')
            this.fill_charts_four_factors(four_factors, 'ORB %', 'chart-orb', 'orb')
            this.fill_charts_four_factors(four_factors, 'DRB %', 'chart-drb', 'drb')
            this.fill_charts_four_factors(four_factors, 'FTR %', 'chart-ftr', 'ft')
    
            let selected_point = four_factors.at(-1)
            this.get_four_factors_breakdown(selected_point)
            console.log(four_factors)
        }else{
            console.log('Sem nenhum novo evento')
        }

        return this.events;
      }
      
    } catch (error) {
      console.error('Erro ao carregar os eventos:', error);
      throw error; // Lança o erro para ser tratado externamente
    }
  }

  

  // Função para calcular os Four Factors (mesma lógica do código original)
    calculateFourFactors(events: any[], min_elapsed_time: number | null = null, max_elapsed_time: number | null = null): FourFactorsData[] {
        // Inicializa as estatísticas para 'home' e 'away' por time
        const stats = {
        home: {
            tentativas_arremessos: 0,
            arremessos_convertidos: 0,
            arremessos_3_convertidos: 0,
            turnouvers: 0,
            tentativas_lance_livre: 0,
            lances_livres_convertidos: 0,
            rebotes_ataque: 0,
            rebotes_defesa: 0,
            pontos: 0
        },
        away: {
            tentativas_arremessos: 0,
            arremessos_convertidos: 0,
            arremessos_3_convertidos: 0,
            turnouvers: 0,
            tentativas_lance_livre: 0,
            lances_livres_convertidos: 0,
            rebotes_ataque: 0,
            rebotes_defesa: 0,
            pontos: 0,
        },
        };

        // Inicializa as estatísticas para jogadores de home e away
        const playerStats: { home: any, away: any } = {
            home: {},
            away: {}
        };

        let four_factors: FourFactorsData[] = [];

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const elapsed_time = ((event.time.quarter.id - 1) * 600) + event.time.quarter.elapsed_seconds;
            const player_id = event.player.id;

            if (min_elapsed_time !== null && max_elapsed_time !== null){
                if (elapsed_time < min_elapsed_time || elapsed_time > max_elapsed_time){
                    if (four_factors.at(-1)?.elapsed_time === elapsed_time){
                        four_factors = four_factors.slice(0, -1)
                    }
            
                    four_factors.push({
                        elapsed_time: elapsed_time,
                        home: {
                        efg: null,
                        tov: null,
                        orb: null,
                        drb: null,
                        ft: null,
                        pontos: null
                        },
                        away: {
                        efg: null,
                        tov: null,
                        orb: null,
                        drb: null,
                        ft: null,
                        pontos: null
                        },
                    });
                    continue
                }
            }

            // Determina se o evento pertence ao time da casa ou visitante
            const isHomeTeam = event.team.id === event.match.home_team.id;
            const currentStats = isHomeTeam ? stats.home : stats.away;
            const currentTeam = isHomeTeam ? 'home' : 'away';

            // Inicializa as estatísticas do jogador se ainda não existirem para o time correspondente
            if (!playerStats[currentTeam][player_id]) {
                playerStats[currentTeam][player_id] = {
                    pontos: 0,
                    tentativas_arremessos: 0,
                    arremessos_convertidos: 0,
                    arremessos_3_convertidos: 0,
                    turnouvers: 0,
                    tentativas_lance_livre: 0,
                    lances_livres_convertidos: 0,
                    rebotes_ataque: 0,
                    rebotes_defesa: 0,
                };
            }

            const currentPlayerStats = playerStats[currentTeam][player_id];  // Estatísticas do jogador

            // Atualiza as estatísticas do jogador e do time com base no evento
            // 'ENT', 'ENE'
            if (['A2C', 'A2E', 'A3C', 'A3E', 'ENT', 'ENE'].includes(event.code)) {
                currentStats.tentativas_arremessos++;
                currentPlayerStats.tentativas_arremessos++;  // Atualiza também para o jogador

                if (['A2C', 'A3C', 'ENT'].includes(event.code)) {
                    currentStats.arremessos_convertidos++;
                    currentPlayerStats.arremessos_convertidos++;  // Atualiza também para o jogador

                    if (event.code === 'A3C') {
                        currentStats.arremessos_3_convertidos++;
                        currentPlayerStats.arremessos_3_convertidos++;  // Atualiza também para o jogador
                    }
                }
            }

            if (['ERR', 'FAO', 'V24', 'V3S', 'V5S', 'V8S', 'VIA', 'VIC', 'VSQ', 'VVC'].includes(event.code)) {
                currentStats.turnouvers++;
                currentPlayerStats.turnouvers++;  // Atualiza também para o jogador
            }

            if (['LLC', 'LLE'].includes(event.code)) {
                currentStats.tentativas_lance_livre++;
                currentPlayerStats.tentativas_lance_livre++;  // Atualiza também para o jogador

                if (event.code === 'LLC') {
                    currentStats.lances_livres_convertidos++;
                    currentPlayerStats.lances_livres_convertidos++;  // Atualiza também para o jogador
                }
            }

            if (event.code === 'LLC'){
                currentStats.pontos += 1;
                currentPlayerStats.pontos += 1;
            }

            if (['ENT', 'A2C'].includes(event.code)){
                currentStats.pontos += 2;
                currentPlayerStats.pontos += 2;
            }

            if (event.code === 'A3C'){
                currentStats.pontos += 3;
                currentPlayerStats.pontos += 3;
            }


            if (['ROE', 'REO'].includes(event.code)) {
                currentStats.rebotes_ataque++;
                currentPlayerStats.rebotes_ataque++;  // Atualiza também para o jogador
            }

            if (['RED', 'RDE'].includes(event.code)) {
                currentStats.rebotes_defesa++;
                currentPlayerStats.rebotes_defesa++;  // Atualiza também para o jogador
            }

            // Função para calcular os Four Factors
            const calculateFactors = (sideStats: any, oppositeStats: any) => {
                const efg = sideStats.tentativas_arremessos === 0
                    ? 0
                    : (sideStats.arremessos_convertidos + 0.5 * sideStats.arremessos_3_convertidos) / sideStats.tentativas_arremessos;

                const orb = (sideStats.rebotes_ataque + oppositeStats.rebotes_defesa) === 0
                    ? 0
                    : sideStats.rebotes_ataque / (sideStats.rebotes_ataque + oppositeStats.rebotes_defesa);
                    
                const poss = sideStats.tentativas_arremessos + 0.4 * sideStats.tentativas_lance_livre - 1.07 * orb * (sideStats.tentativas_arremessos - sideStats.arremessos_convertidos) + sideStats.turnouvers
                const poss_ot = oppositeStats.tentativas_arremessos + 0.4 * oppositeStats.tentativas_lance_livre - 1.07 * orb * (oppositeStats.tentativas_arremessos - oppositeStats.arremessos_convertidos) + oppositeStats.turnouvers
                const poss_game = 0.5 * (poss + poss_ot)

                const tov = poss_game === 0
                    ? 0
                    : sideStats.turnouvers / poss_game;

                // const tov = (sideStats.tentativas_arremessos + 0.44 * sideStats.tentativas_lance_livre + sideStats.turnouvers) === 0
                //     ? 0
                //     : sideStats.turnouvers / (sideStats.tentativas_arremessos + 0.44 * sideStats.tentativas_lance_livre + sideStats.turnouvers);
                    
                const drb = (sideStats.rebotes_defesa + oppositeStats.rebotes_ataque) === 0
                    ? 0
                    : sideStats.rebotes_defesa / (sideStats.rebotes_defesa + oppositeStats.rebotes_ataque);

                const ft = sideStats.tentativas_arremessos === 0
                    ? 0
                    : sideStats.lances_livres_convertidos / sideStats.tentativas_arremessos;

                const pontos = sideStats.pontos

                return { efg, tov, orb, drb, ft, pontos };
            };

            // Função para calcular Four Factors para jogadores
            const calculatePlayerFactors = (playerStats: any, teamStats: any, opponentStats: any) => {
                // Estatísticas do time que serão usadas como denominadores
                const teamFieldGoalAttempts = teamStats.tentativas_arremessos;
                const teamTurnovers = teamStats.turnouvers;
                const teamOffensiveRebounds = teamStats.rebotes_ataque;
                const opponentDefensiveRebounds = opponentStats.rebotes_defesa;
                const teamDefensiveRebounds = teamStats.rebotes_defesa;
                const opponentOffensiveRebounds = opponentStats.rebotes_ataque;
                const teamFreeThrowAttempts = teamStats.tentativas_lance_livre;
            
                // Calcular eFG% do jogador usando as tentativas de arremesso do time como denominador
                const efg = teamFieldGoalAttempts === 0
                    ? 0
                    : (playerStats.arremessos_convertidos + 0.5 * playerStats.arremessos_3_convertidos) / teamFieldGoalAttempts;

                const orb = (teamOffensiveRebounds + opponentDefensiveRebounds) === 0
                    ? 0
                    : playerStats.rebotes_ataque / (teamOffensiveRebounds + opponentDefensiveRebounds);
            
                const poss = teamStats.tentativas_arremessos + 0.4 * teamStats.tentativas_lance_livre - 1.07 * orb * (teamStats.tentativas_arremessos - teamStats.arremessos_convertidos) + teamStats.turnouvers
                const poss_ot = opponentStats.tentativas_arremessos + 0.4 * opponentStats.tentativas_lance_livre - 1.07 * orb * (opponentStats.tentativas_arremessos - opponentStats.arremessos_convertidos) + opponentStats.turnouvers
                const poss_game = 0.5 * (poss + poss_ot)

                const tov = poss_game === 0
                    ? 0
                    : playerStats.turnouvers / poss_game;
            
                // Calcular TOV% do jogador usando as tentativas de arremesso do time, lances livres e turnovers do time como denominador
                // const tov = (teamFieldGoalAttempts + 0.44 * teamFreeThrowAttempts + teamTurnovers) === 0
                //     ? 0
                //     : playerStats.turnouvers / (teamFieldGoalAttempts + 0.44 * teamFreeThrowAttempts + teamTurnovers);
            
                // Calcular ORB% do jogador usando rebotes ofensivos do time e defensivos do adversário como denominador
                // Calcular DRB% do jogador usando rebotes defensivos do time e ofensivos do adversário como denominador
                const drb = (teamDefensiveRebounds + opponentOffensiveRebounds) === 0
                    ? 0
                    : playerStats.rebotes_defesa / (teamDefensiveRebounds + opponentOffensiveRebounds);
            
                // Calcular FT% do jogador usando as tentativas de lance livre do time como denominador
                const ft = teamFieldGoalAttempts === 0
                    ? 0
                    : playerStats.lances_livres_convertidos / teamFieldGoalAttempts;

                const pontos = playerStats.pontos
            
                return { efg, tov, orb, drb, ft,  pontos};
            };

            // Avaliação atual para times e jogadores
            const current_evaluation = {
                elapsed_time: elapsed_time,
                home: calculateFactors(stats.home, stats.away),
                away: calculateFactors(stats.away, stats.home),
                players: {
                    home: {} as Record<string, any>,  // Jogadores do time da casa
                    away: {} as Record<string, any>   // Jogadores do time visitante
                }
            };

            // Adiciona Four Factors para cada jogador na avaliação atual
            Object.keys(playerStats.home).forEach(playerId => {
                current_evaluation.players.home[playerId] = calculatePlayerFactors(playerStats.home[playerId], stats.home, stats.away);
            });

            Object.keys(playerStats.away).forEach(playerId => {
                current_evaluation.players.away[playerId] = calculatePlayerFactors(playerStats.away[playerId], stats.away, stats.home);
            });

            if (four_factors.at(-1)?.elapsed_time === elapsed_time){
                four_factors = four_factors.slice(0, -1)
            }
            four_factors.push(current_evaluation);
        }

        return four_factors;
    }



    get_four_factors_breakdown(selected_point: any) {
        const categories = ['eFG%', 'TOV%', 'ORB%', 'DRB%', 'FT%']; // Uma única categoria para o time


        const homeSeries = this.home_players.map((player: any, index) => {
            // Obtém as estatísticas do jogador pelo ID
            const playerStats = selected_point.players.home[player.id];
            return {
                type: 'bar' as const,
                name: player ? player.nickname : 'Unknown', // Usa o nickname do jogador
                data: playerStats ? [
                    playerStats.efg * 100,
                    playerStats.tov * 100,
                    playerStats.orb * 100,
                    playerStats.drb * 100,
                    playerStats.ft * 100
                ] : [0, 0, 0, 0, 0], // Se não houver estatísticas, preenche com zeros
                color: player ? player.color : '#FFFFFF', // Cor do jogador
                stack: 'home' // Stack para a equipe "Home"
            };
        });
        
        // Cria as séries para jogadores da equipe "Away"
        const awaySeries = this.away_players.map((player: any, index) => {
            // Obtém as estatísticas do jogador pelo ID
            const playerStats = selected_point.players.away[player.id];
            return {
                type: 'bar' as const,
                name: player ? player.nickname : 'Unknown', // Usa o nickname do jogador
                data: playerStats ? [
                    playerStats.efg * 100,
                    playerStats.tov * 100,
                    playerStats.orb * 100,
                    playerStats.drb * 100,
                    playerStats.ft * 100
                ] : [0, 0, 0, 0, 0], // Se não houver estatísticas, preenche com zeros
                color: player ? player.color : '#FFFFFF', // Cor do jogador
                stack: 'away' // Stack para a equipe "Away"
            };
        });
    
        // Combina as séries de "Home" e "Away"
        const series = [...homeSeries, ...awaySeries];

        const instance = this 
        const chartOptions: Highcharts.Options = {
            chart: {
                type: 'bar',
                events: {
                    click: (event: any) => {
                        let clickedCategoryIndex;
    
                        // Verifica se o clique foi em um ponto (barra específica)
                        if (event.point) {
                            clickedCategoryIndex = event.point.index; // Obtém o índice do ponto clicado
                        } else if (event.xAxis && event.xAxis[0]) {
                            // Se o clique não foi em um ponto, obtém o índice com base no eixo x
                            const xAxis = event.xAxis[0];
                            clickedCategoryIndex = Math.round(xAxis.value); // Calcula o índice da categoria baseado na posição do clique
                        }
    
                        // Verifica se o xAxis é um array ou objeto e obtém as categorias
                        let categories: string[] = [];
                        if (Array.isArray(chartOptions.xAxis)) {
                            categories = chartOptions.xAxis[0]?.categories || [];
                        } else if (chartOptions.xAxis && !Array.isArray(chartOptions.xAxis)) {
                            categories = chartOptions.xAxis?.categories || [];
                        }
    
                        const categoryName = categories[clickedCategoryIndex];
    
                        // Verifica se o índice da categoria é válido e abre o modal
                        if (categoryName) {
                            this.zone.run(() => {
                                const modalRef = this.modalService.open(CategoryModalComponent, {
                                    size: 'lg',
                                    centered: true
                                });
                                modalRef.componentInstance.data = { category: categoryName, selected_point: selected_point, home_players: this.home_players, away_players: this.away_players};
                            });
                        }
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories, // Categorias no eixo Y (barras horizontais)
                title: {
                    text: null
                },
                crosshair: true
            },
            yAxis: {
                min: 0,
                max: 105,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (
                            Highcharts.defaultOptions?.title?.style?.color
                        ) || 'gray'
                    },
                    formatter: function () {
                        return `${this.total.toFixed(1)}%`;
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: series,
            tooltip: {
                shared: true,
                formatter: function () {
                    let tooltipHtml = '';
                    let homeHtml = '';
                    let awayHtml = '';
            
                    // Itera sobre os pontos para separar jogadores de "home" e "away"
                    this.points?.forEach((point: any) => {
                        const isHome = point.series.options.stack === 'home';
                        const lineHtml = `<span style="color:${point.series.color}">${point.series.name}</span>: ${point.y.toFixed(1)}%<br/>`;
            
                        if (isHome) {
                            homeHtml += lineHtml;
                        } else {
                            awayHtml += lineHtml;
                        }
                    });
            
                    // Concatena o conteúdo do tooltip com um espaço entre os jogadores "Home" e "Away"
                    tooltipHtml = homeHtml + '<br/>' + awayHtml;
            
                    return tooltipHtml;
                },
                useHTML: true // Permite o uso de HTML para estilizar o tooltip
            },
            plotOptions: {
                bar: {
                    stacking: 'normal', 
                    dataLabels: {
                        enabled: false,
                    },
                    grouping: true,
                    point: {
                        events: {
                            click: (event: any) => {
                                const categoryIndex = event.point.index;
                                let categoryName = '';
    
                                // Verifica se xAxis é um array ou objeto
                                if (Array.isArray(chartOptions.xAxis)) {
                                    categoryName = chartOptions.xAxis[0].categories?.[categoryIndex] || '';
                                } else {
                                    categoryName = chartOptions.xAxis?.categories?.[categoryIndex] || '';
                                }
    
                                // Executa dentro da zona Angular para garantir que a mudança de estado seja detectada
                                this.zone.run(() => {
                                    const modalRef = instance.modalService.open(CategoryModalComponent, {
                                        size: 'lg',
                                        centered: true
                                    });
                                    modalRef.componentInstance.data = { category: categoryName, selected_point: selected_point, home_players: this.home_players, away_players: this.away_players };
                                });
                            }
                        }
                    }
                }
            }
        };
    
        Highcharts.chart('chart-container', chartOptions);
        // Inicializar o gráfico
    }
}
