import * as d3 from 'd3';

export default class ForceSimulation{
    constructor(nodes, links){
        const sim_nodes = nodes.map(elm=>{
            return {
                name: elm.key,
            }
        })
        const sim_links = links.map(elm=>{
            return {
                source: elm.from,
                target: elm.to,
            }
        })

        this.simulation = d3.forceSimulation(sim_nodes)
        .force("charge", d3.forceManyBody().distanceMin([100]) )
        .force("link", d3.forceLink(sim_links))
        .force("center", d3.forceCenter().x(300).y(300))
        // .tick(()=>{
        //     console.log()
        // })
        .force("collision",d3.forceCollide(60))
        // .velocityDecay(0.2) 
        // .velocityDecay(0.1)

        this.sim_nodes = sim_nodes
        this.sim_links = sim_links
    }

    force(name, func){
        this.simulation.force(name, func)
    }

    onTicks(func){
        func.bind(this)
        this.simulation.on("tick", ()=>{
            func(this.sim_nodes, this.sim_links)
        })
    }

    find(data){
        return this.sim_nodes.find(sim_node=> data.key===sim_node.name)
    }
}