import { withCollector } from '../collector/withCollector';
import Collector from "../collector/Collector";

const CollectorWrapper = withCollector(Collector);

export default CollectorWrapper;
