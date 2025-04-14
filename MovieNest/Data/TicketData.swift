//
//  TicketData.swift
//  MovieNest
//
//  Created by Samanyu on 26/02/25.
//

import Foundation

struct TicketModel: Identifiable {
    var id = UUID().uuidString
    var image: String
    var title: String
    var subtitle: String
    var top: String
    var bottom: String
}

var tickets: [TicketModel] = [
    TicketModel(image: "thor", title: "Thor", subtitle: "Love and Thunder", top: "thor-top", bottom: "thor-bottom"),
]

struct TicketData {
    static let allTickets: [(String, String, String, String, String)] = [
        ("scarlet", "Doctor Strange", "in the Multiverse of Madness", "scarlet", "scarlet-bottom"),
        ("panther", "Black Panther", "Wakanda Forever", "panther", "panther-bottom"),
        ("thor", "Thor", "Love and Thunder", "thor-top", "thor-bottom"),
        ("bangbang", "Bang Bang", "", "bangbang", "bang-bottom"),
        ("Dune", "Dune", "It Begins", "poster1", "bang-bottom"),
        ("TopGun", "Top Gun", "Maverick", "poster2", "bang-bottom"),
        ("animal", "Animal", "", "poster3", "bang-bottom"),
        ("damsel", "Damsel", "", "poster4", "bang-bottom"),
        ("uncharter", "Uncharter", "", "poster5", "bang-bottom"),
        ("jumanji", "Jumanji", "Next Level", "poster6", "bang-bottom"),
        ("fallguy", "Fall Guy", "", "poster7", "bang-bottom"),
        ("oppenheimer", "Oppenheimer", "", "poster8", "bang-bottom"),
        ("blackwidow", "Black Widow", "", "poster9", "bang-bottom"),
        ("johnwick", "John Wick", "3", "poster10", "bang-bottom"),
        ("blackwidow", "Kho Gaya", "Hum Kaha", "hindi1", "bang-bottom"),
        ("blackwidow", "Zindagi Na", "Milegi Dobara", "hindi2", "bang-bottom"),
        ("blackwidow", "Munjya", "", "hindi3", "bang-bottom"),
        ("blackwidow", "Gentleman", "", "hindi4", "bang-bottom"),
        ("blackwidow", "Brahmastra", "", "hindi5", "bang-bottom"),
        ("blackwidow", "Kapoor &", "Sons", "hindi6", "bang-bottom"),
        ("blackwidow", "Kill", "", "hindi7", "bang-bottom"),
        ("blackwidow", "Stree", "2", "hindi8", "bang-bottom"),
        ("blackwidow", "Dhoom", "3", "hindi9", "bang-bottom"),
        ("blackwidow", "Tamasha", "", "hindi10", "bang-bottom"),
        
    ]
}
