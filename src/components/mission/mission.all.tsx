// components/Missions/ActiveMissions.tsx
import { useMissionStore } from "@/store/mission.store";
import { Mission } from "@/types/mission.interface";

export const ActiveMissions = () => {
  const activeMissions = useMissionStore((state) => state.activeMissions);

  if (activeMissions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No active missions</p>
      </div>
    );
  }

  return (
    <div className={styles.missionList}>
      <h2>Active Missions</h2>
      {activeMissions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
};

export const PreviousMissions = () => {
  const previousMissions = useMissionStore((state) => state.previousMissions);

  if (previousMissions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No previous missions</p>
      </div>
    );
  }

  return (
    <div className={styles.missionList}>
      <h2>Previous Missions</h2>
      {previousMissions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
};

export const MissionCard = ({ mission }: Mission) => {
  const duration = mission.endTime
    ? new Date(mission.endTime).getTime() -
      new Date(mission.startTime).getTime()
    : new Date().getTime() - new Date(mission.startTime).getTime();

  return (
    <div className={`${styles.missionCard} ${styles[mission.status]}`}>
      <div className={styles.missionHeader}>
        <h3>Mission #{mission.id}</h3>
        <span className={styles.status}>{mission.status}</span>
      </div>

      <div className={styles.missionDetails}>
        <div className={styles.resourceInfo}>
          <p>Consumed Resources:</p>
          <ul>
            <li>Food: {mission.consumedResources.food}</li>
            <li>Fuel: {mission.consumedResources.fuel}</li>
            <li>Ammo: {mission.consumedResources.ammo}</li>
          </ul>
        </div>

        <div className={styles.timeInfo}>
          <p>Started: {new Date(mission.startTime).toLocaleString()}</p>
          {mission.endTime && (
            <p>Ended: {new Date(mission.endTime).toLocaleString()}</p>
          )}
          <p>Duration: {Math.floor(duration / 1000 / 60)} minutes</p>
        </div>

        {mission.rewards && (
          <div className={styles.rewards}>
            <p>Rewards:</p>
            <ul>
              <li>XP: {mission.rewards.experience}</li>
              <li>Credits: {mission.rewards.credits}</li>
              {mission.rewards.items?.map((item) => (
                <li key={item.id}>
                  Item: {item.id} x{item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// components/Missions/Missions.module.css
export const styles = {
  missionList: `
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    `,

  missionCard: `
      background: #2a2a2a;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      border-left: 4px solid #666;
  
      &.active {
        border-left-color: #4CAF50;
      }
  
      &.completed {
        border-left-color: #2196F3;
      }
  
      &.failed {
        border-left-color: #f44336;
      }
    `,

  missionHeader: `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
  
      h3 {
        margin: 0;
        color: #fff;
      }
    `,

  status: `
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      text-transform: uppercase;
      
      .active & {
        background: #4CAF50;
      }
      
      .completed & {
        background: #2196F3;
      }
      
      .failed & {
        background: #f44336;
      }
    `,

  missionDetails: `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    `,

  resourceInfo: `
      ul {
        list-style: none;
        padding: 0;
        margin: 8px 0;
      }
    `,

  timeInfo: `
      p {
        margin: 4px 0;
        color: #aaa;
      }
    `,

  rewards: `
      grid-column: 1 / -1;
      background: #333;
      padding: 12px;
      border-radius: 4px;
    `,

  emptyState: `
      text-align: center;
      padding: 40px;
      color: #666;
    `,
};
