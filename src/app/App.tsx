import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            <ul>
                <li>Цели:
                    <ul>
                        <li>понять базовые принципы построения React приложения</li>
                        <li>познакомиться с составом внешних модулей современного приложения на React (сохранение состояния, кеширование, графика и т.д.)</li>
                        <li>познакомиться с заменами устаревших модулей (webpack)</li>
                        <li>познакомиться с оценкой безопасности модулей</li>
                    </ul>
                </li>

                <li>Какими технологиями хотилось бы овладеть
                    <ul>
                        <li>MOBX или аналог</li>
                    </ul>
                </li>

                <li>Какими технологиями уже владеете
                    <ul>
                        <li>есть опыт разработки на MVC ASP.NET Framefork, Django, Angular</li>
                    </ul>
                </li>

                <li>О себе
                    <ul>
                        <li>программист-разработчик</li>
                    </ul>
                </li>
            </ul>
        </p>
      </header>
    </div>
  );
}

export default App;
