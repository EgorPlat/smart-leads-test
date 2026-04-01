import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store"
import { IScenariosItem } from "../../store/scenarios/scenarios";
import { useNavigate } from "react-router-dom";
import "./ScenariosList.css";

export default function ScenariosList() {

    const list = useTypedSelector((store) => store.scenarious.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createScenario = () => {
        navigate(`/editor/${Date.now()}`);
    };

    const gotoScenario = (el: IScenariosItem) => {
        navigate(`/editor/${el.id}`);
    };

    return (
        <div className="scenarios-list">
            {
                list.length === 0 && (
                    <span className="warning">
                        Пока нет ни одного сценария <button className="btn" onClick={createScenario}>Создать</button>
                    </span>
                )
            }
            {
                list.length !== 0 && (
                    <button className="btn" onClick={createScenario}>Создать</button>
                )
            }
            {
                list.map((el: IScenariosItem) => {
                    return (
                        <div className="scenario-wrapper" key={el.title}>
                            <div className="title">
                                { el.title }
                            </div>
                            <div className="actions">
                                <button className="btn" onClick={() => gotoScenario(el)}>Перейти</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}